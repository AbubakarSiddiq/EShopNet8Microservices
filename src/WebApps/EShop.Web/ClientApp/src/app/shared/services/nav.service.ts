import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	type?: string;
	megaMenu?: boolean;
	image?: string;
	active?: boolean;
	badge?: boolean;
	badgeText?: string;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {
	constructor() { }

	public screenWidth: any;
	public leftMenuToggle: boolean = false;
	public mainMenuToggle: boolean = false;
	public products: any[] = [];
	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	get filterbyCategory() {
		const category = [...new Set(this.products.map(product => product.subCategories?.name))]
		return category
	  }

	MENUITEMS: Menu[] = [
		{ path: '/', title: 'Home', type: 'link' },
		{ path: '/categories', title: 'Categories', type: 'link' },
		{ path: '/aboutus', title: 'About Us', type: 'link' },
		{ path: '/contact', title: 'Contact', type: 'link' },
	];

	LEFTMENUITEMS: Menu[] = [];

	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
	leftMenuItems = new BehaviorSubject<Menu[]>(this.LEFTMENUITEMS);
}
