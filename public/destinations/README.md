# Photos des destinations

Pour ajouter une vraie photo à une destination sur la page d'accueil, dépose ici un fichier nommé
exactement comme le `slug` de la destination dans `lib/airports.ts`, avec l'extension `.jpg`,
`.jpeg`, `.png` ou `.webp`.

Exemples de noms attendus (voir `AFRICAN_DESTINATIONS` dans `lib/airports.ts` pour la liste
complète et les slugs exacts) :

- `dakar.jpg`
- `abidjan.jpg`
- `casablanca.jpg`
- `alger.jpg`
- `kinshasa.jpg`
- `brazzaville.jpg`
- `conakry.jpg`

Dès qu'un fichier avec le bon nom est présent, `components/DestinationCard.tsx` l'utilise
automatiquement à la place du bandeau dégradé — aucune modification de code n'est nécessaire.

Recommandations :
- Format paysage, environ 800×600px (pas besoin de plus grand, la carte est petite)
- Fichier compressé (quelques centaines de Ko max) pour ne pas ralentir le site
- Utilise tes propres photos, ou des photos libres de droits (Unsplash, Pexels, Pixabay — vérifie
  la licence de chaque image avant de l'utiliser)
