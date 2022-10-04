export interface ProfileUser {
    uid: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    phone?: string;
    address?: string;
    photoURL?: string;
    age?: number;
    gender?: string;
    listOfLikes?: string[];
    futebol?: boolean;
    games?: boolean;
    cinema?: boolean;
    gardening?:boolean;
    food?:boolean;
    
    matchList?: string[];
}