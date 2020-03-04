import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Inicio', type: 'link', icon: 'av_timer' },
  { state: 'users', type: 'link', name: 'Usuarios', icon: 'person' },
  { state: 'projects', type: 'link', name: 'Proyectos', icon: 'folder' },
  { state: 'evaluation', type: 'link', name: 'Rúbrica', icon: 'view_comfy' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
