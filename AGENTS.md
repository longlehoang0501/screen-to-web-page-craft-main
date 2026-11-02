<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Project rules

- Public registration submissions insert through the publishable (anon) client inside the `submitRegistration` server function (`src/lib/registration.functions.ts`); `public.registrations` is anon INSERT-only under RLS. Never grant anon SELECT/UPDATE/DELETE on it — the owner reads submissions in the backend, not the app.
- All user-facing copy is Vietnamese (site language requirement).
