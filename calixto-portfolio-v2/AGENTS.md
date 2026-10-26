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

## Rules

- Keep images as real files under `src/assets/` imported directly (e.g. `import logo from "@/assets/calixto-logo.png"`), not `.asset.json` hosted pointers, so the project builds and runs outside Lovable.
- When the user's own artwork needs a framing change, crop the original file only — never replace it with a generated image.
