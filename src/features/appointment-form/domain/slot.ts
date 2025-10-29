export type SlotStaff = {
	id: string;
	firstName: string;
	avatarUrl: string | null;
};
export interface Slot {
	staff: SlotStaff | null;
	start: string;
	end: string;
}
