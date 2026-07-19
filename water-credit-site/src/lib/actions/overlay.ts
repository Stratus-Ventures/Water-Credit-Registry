import type { Action } from 'svelte/action';

/**
 * Trap Tab focus within `node` while it's mounted, focus its first focusable
 * on mount, and restore focus to the previously-focused element on destroy.
 */
export const trapFocus: Action<HTMLElement> = (node) => {
	const selector =
		'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
	const previouslyFocused = document.activeElement as HTMLElement | null;

	const focusables = () =>
		Array.from(node.querySelectorAll<HTMLElement>(selector)).filter((el) => el.offsetParent !== null);

	function onKeydown(e: KeyboardEvent) {
		if (e.key !== 'Tab') return;
		const items = focusables();
		if (items.length === 0) {
			e.preventDefault();
			return;
		}
		const first = items[0];
		const last = items[items.length - 1];
		if (e.shiftKey && document.activeElement === first) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && document.activeElement === last) {
			e.preventDefault();
			first.focus();
		}
	}

	(focusables()[0] ?? node).focus();
	node.addEventListener('keydown', onKeydown);

	return {
		destroy() {
			node.removeEventListener('keydown', onKeydown);
			previouslyFocused?.focus?.();
		}
	};
};

/**
 * Drag `node` downward — starting only from a `[data-drag-handle]` child — and
 * call `onDismiss` once it's dragged past `threshold` px. Otherwise it springs back.
 */
export const dragDismiss: Action<HTMLElement, { onDismiss: () => void; threshold?: number }> = (
	node,
	params
) => {
	let onDismiss = params.onDismiss;
	let threshold = params.threshold ?? 100;
	let startY = 0;
	let offset = 0;
	let dragging = false;

	function onPointerdown(e: PointerEvent) {
		if (!(e.target as HTMLElement).closest('[data-drag-handle]')) return;
		dragging = true;
		startY = e.clientY;
		offset = 0;
		node.setPointerCapture(e.pointerId);
		node.style.transition = 'none';
	}
	function onPointermove(e: PointerEvent) {
		if (!dragging) return;
		offset = Math.max(0, e.clientY - startY); // downward only
		node.style.transform = `translateY(${offset}px)`;
	}
	function onPointerup() {
		if (!dragging) return;
		dragging = false;
		if (offset > threshold) {
			node.style.transition = '';
			node.style.transform = '';
			onDismiss();
		} else {
			// spring back smoothly using our motion tokens
			node.style.transition = 'transform var(--duration-base) var(--ease-snappy)';
			node.style.transform = '';
		}
	}

	node.addEventListener('pointerdown', onPointerdown);
	node.addEventListener('pointermove', onPointermove);
	node.addEventListener('pointerup', onPointerup);
	node.addEventListener('pointercancel', onPointerup);

	return {
		update(p) {
			onDismiss = p.onDismiss;
			threshold = p.threshold ?? 100;
		},
		destroy() {
			node.removeEventListener('pointerdown', onPointerdown);
			node.removeEventListener('pointermove', onPointermove);
			node.removeEventListener('pointerup', onPointerup);
			node.removeEventListener('pointercancel', onPointerup);
		}
	};
};
