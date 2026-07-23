// Mock data for the Overview dashboard. Replace with live registry data once the
// backend feed is wired up — the shapes here are what the panels expect.

export type Station = {
	id: string;
	name: string;
	city: string;
	state: string;
	lng: number;
	lat: number;
	credits: number; // total credits minted at this station
	rate: number; // credits / hour, live mint rate
	status: 'active' | 'idle';
};

export const stations: Station[] = [
	{
		id: 'sac',
		name: 'Sierra Nevada Reclaim',
		city: 'Sacramento',
		state: 'CA',
		lng: -121.49,
		lat: 38.58,
		credits: 184_320,
		rate: 42,
		status: 'active'
	},
	{
		id: 'lnk',
		name: 'Ogallala Aquifer Node',
		city: 'Lincoln',
		state: 'NE',
		lng: -96.7,
		lat: 40.81,
		credits: 96_540,
		rate: 18,
		status: 'active'
	},
	{
		id: 'elp',
		name: 'Rio Grande Station',
		city: 'El Paso',
		state: 'TX',
		lng: -106.49,
		lat: 31.76,
		credits: 142_870,
		rate: 27,
		status: 'active'
	},
	{
		id: 'chi',
		name: 'Great Lakes Intake',
		city: 'Chicago',
		state: 'IL',
		lng: -87.63,
		lat: 41.88,
		credits: 233_910,
		rate: 61,
		status: 'active'
	},
	{
		id: 'pdx',
		name: 'Cascade Basin',
		city: 'Portland',
		state: 'OR',
		lng: -122.68,
		lat: 45.51,
		credits: 78_220,
		rate: 14,
		status: 'idle'
	},
	{
		id: 'den',
		name: 'Colorado Headwaters',
		city: 'Denver',
		state: 'CO',
		lng: -104.99,
		lat: 39.74,
		credits: 121_640,
		rate: 33,
		status: 'active'
	},
	{
		id: 'mia',
		name: 'Everglades Recharge',
		city: 'Miami',
		state: 'FL',
		lng: -80.19,
		lat: 25.76,
		credits: 167_050,
		rate: 39,
		status: 'active'
	},
	{
		id: 'alb',
		name: 'Hudson Valley Works',
		city: 'Albany',
		state: 'NY',
		lng: -73.75,
		lat: 42.65,
		credits: 64_410,
		rate: 11,
		status: 'idle'
	},
	{
		id: 'phx',
		name: 'Sonoran Reclaim',
		city: 'Phoenix',
		state: 'AZ',
		lng: -112.07,
		lat: 33.45,
		credits: 152_380,
		rate: 45,
		status: 'active'
	},
	{
		id: 'hou',
		name: 'Gulf Coast Desal',
		city: 'Houston',
		state: 'TX',
		lng: -95.37,
		lat: 29.76,
		credits: 198_760,
		rate: 52,
		status: 'active'
	},
	{
		id: 'sea',
		name: 'Puget Sound Cell',
		city: 'Seattle',
		state: 'WA',
		lng: -122.33,
		lat: 47.61,
		credits: 88_930,
		rate: 21,
		status: 'active'
	},
	{
		id: 'msy',
		name: 'Mississippi Delta',
		city: 'New Orleans',
		state: 'LA',
		lng: -90.07,
		lat: 29.95,
		credits: 109_270,
		rate: 24,
		status: 'idle'
	}
];

export const totalCredits = stations.reduce((sum, s) => sum + s.credits, 0);
export const totalRate = stations.reduce((sum, s) => sum + (s.status === 'active' ? s.rate : 0), 0);
export const activeStations = stations.filter((s) => s.status === 'active').length;

// Continental-US bounding box, used to project lng/lat → 0..1 screen space for the
// fallback map. West/East longitude, South/North latitude.
export const US_BOUNDS = { west: -125, east: -66.5, south: 24, north: 49.5 };

/** Project a lng/lat to a { x, y } fraction (0..1) within the US bounding box. */
export function projectUS(lng: number, lat: number): { x: number; y: number } {
	const x = (lng - US_BOUNDS.west) / (US_BOUNDS.east - US_BOUNDS.west);
	const y = (US_BOUNDS.north - lat) / (US_BOUNDS.north - US_BOUNDS.south);
	return { x: Math.min(1, Math.max(0, x)), y: Math.min(1, Math.max(0, y)) };
}

export type CreditEvent = {
	id: number;
	station: Station;
	amount: number;
	at: number; // epoch ms
};

let seq = 0;

/** Fabricate one live credit-creation event from a random active station. */
export function makeEvent(now: number): CreditEvent {
	const active = stations.filter((s) => s.status === 'active');
	const station = active[Math.floor(Math.random() * active.length)];
	const amount = 3 + Math.floor(Math.random() * 78);
	return { id: ++seq, station, amount, at: now };
}

/** Seed a starter feed so the panel isn't empty on first paint (newest first). */
export function seedEvents(now: number, count = 8): CreditEvent[] {
	return Array.from({ length: count }, (_, i) => makeEvent(now - i * 4200));
}

/** Compact number formatting: 233910 → "233.9K", 1_240_000 → "1.24M". */
export function compact(n: number): string {
	if (n >= 1_000_000) return (n / 1_000_000).toFixed(2).replace(/\.?0+$/, '') + 'M';
	if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
	return String(n);
}

/** Short relative time: "just now", "12s", "4m". */
export function ago(from: number, now: number): string {
	const s = Math.max(0, Math.round((now - from) / 1000));
	if (s < 3) return 'just now';
	if (s < 60) return s + 's';
	const m = Math.round(s / 60);
	if (m < 60) return m + 'm';
	return Math.round(m / 60) + 'h';
}
