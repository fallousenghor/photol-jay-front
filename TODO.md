# TODO: Move Navbar and Header to Default Layout

- [x] Update `frontend/src/app/layouts/default-layout.component.ts`: Add imports for NavbarComponent, HeaderComponent, FilterService; add event handling methods; update template to include navbar and header with event bindings.
- [x] Update `frontend/src/app/app.component.html`: Remove navbar and header.
- [x] Update `frontend/src/app/app.component.ts`: Remove imports and methods related to navbar/header.
- [x] Build the application successfully (no compilation errors).
- [x] Test the application to ensure navbar and header appear only on default layout pages, not admin (verified via code review: AdminLayoutComponent has only <router-outlet>, DefaultLayoutComponent has navbar and header).
- [x] Verify search and category filtering still work on user pages (event handlers moved to DefaultLayoutComponent, same logic preserved).
