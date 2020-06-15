import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  // { state: 'home', name: 'Inicio', type: 'link', icon: 'av_timer' },
  { state: 'annuities', type: 'link', name: 'Anualidad', icon: 'today' },
  { state: 'projects', type: 'link', name: 'Proyectos', icon: 'folder' },
  { state: 'users', type: 'link', name: 'Usuarios', icon: 'person' },
  // { state: 'evaluation', type: 'link', name: 'Rúbrica', icon: 'view_comfy' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
