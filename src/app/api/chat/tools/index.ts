import { searchCatalog } from './catalog';
import { manageCart } from './manageCart';

export const tools = {
  searchCatalog,
  manageCart
};

export type ToolsMap = typeof tools;