# PROMPT CODEX — Génération complète du site Café Samsara

## RÔLE ET CONTEXTE

Tu es un développeur web senior expert en HTML5/CSS3/JavaScript vanilla, SEO technique, accessibilité WCAG 2.2, performance Core Web Vitals et déploiement Apache/Hostinger.

Tu dois générer **intégralement** un site vitrine statique premium pour **Café Samsara**, un café situé à Zipolite (Oaxaca), Mexique.

---

## INFORMATIONS PROJET

- **Marque** : Café Samsara
- **Lieu** : Zipolite, Oaxaca, Mexique
- **Type** : Site vitrine statique premium
- **Langue principale** : Espagnol (es-MX)
- **Micro-blocs anglais** : Présents sur hero, CTA, infos pratiques (sans dupliquer les pages)
- **Positionnement** : Tropical chic, naturel, artisanal, "oasis à deux pas de la plage", café de spécialité, desayunos, jugos, pastelería, ambiance calme et culturelle

### Variables configurables (à centraliser)
```
SITE_URL = "https://cafesamsara.example/"
PHONE_DISPLAY = "+52 56 2360 2203"
PHONE_TEL = "+525623602203"
EMAIL = "hola@cafesamsara.example"
WHATSAPP = "" (vide par défaut, configurable)
ADDRESS = "Calle Principal s/n, Zipolite, San Pedro Pochutla, Oaxaca, México"
HOURS = "Lunes a Domingo: 8:00 – 15:00"
MAPS_URL = "https://maps.google.com/?q=Zipolite,Oaxaca,Mexico"
CONTACT_ENDPOINT = "" (vide = mailto, sinon URL endpoint)
```

---

## CONTRAINTES TECHNIQUES OBLIGATOIRES

### A) Stack & Dépendances
- HTML5 sémantique + CSS3 + JavaScript vanilla **exclusivement**
- **AUCUN framework** : pas de React, Vue, Angular, jQuery, Bootstrap, Tailwind, etc.
- **Aucune dépendance externe obligatoire**
- **Pas de Google Fonts** : utiliser `font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;` et `font-family: ui-serif, Georgia, 'Times New Roman', serif;` pour les titres si souhaité

### B) Performance / Core Web Vitals
- **Un seul fichier CSS** : `/assets/css/styles.css`
- **Un seul fichier JS** : `/assets/js/main.js` chargé avec `defer`
- Aucun script bloquant le rendu
- Images : privilégier SVG, ajouter `loading="lazy"`, `width` et `height` explicites, `decoding="async"`
- Éviter les grosses images de fond ; utiliser des dégradés CSS ou SVG légers
- Respecter `prefers-reduced-motion: reduce` pour toutes les animations
- Ajouter des commentaires indiquant où remplacer les placeholders par de vraies images

### C) Accessibilité WCAG 2.2
- Structure sémantique : `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- **Skip link** visible au focus en haut de page
- Contrastes minimum 4.5:1 (texte) et 3:1 (éléments UI)
- Focus visible sur tous les éléments interactifs (outline personnalisé)
- États `:hover` et `:focus` distincts
- **Menu mobile** :
  - Bouton hamburger avec `aria-expanded`, `aria-controls`
  - Fermeture via touche `Escape` et clic extérieur
  - Gestion du focus (trap focus dans le menu ouvert)
- **Accordéons FAQ** :
  - Utiliser `<button>` (pas de `<div>` cliquable)
  - `aria-expanded`, `aria-controls`, navigation clavier
- **Formulaire** :
  - `<label>` explicites liés aux inputs
  - Messages d'erreur avec `aria-describedby`
  - Validation non bloquante (afficher erreurs, ne pas empêcher la saisie)
- Liens téléphone (`tel:`) et WhatsApp accessibles avec texte descriptif

### D) SEO Technique
Chaque page HTML doit inclure :
- `<title>` unique (50-60 caractères)
- `<meta name="description">` unique (150-160 caractères)
- `<link rel="canonical" href="SITE_URL + path">` (jamais d'URL en dur)
- Balises Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale`)
- Twitter Cards (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
- `<meta name="robots" content="index, follow">`
- **Un seul `<h1>`** par page
- Hiérarchie `<h2>` / `<h3>` logique et ordonnée

#### JSON-LD Schema.org obligatoires :
- **index.html** : `LocalBusiness` (type `CafeOrCoffeeShop`) + `Organization`
- **Pages internes** : `BreadcrumbList`
- **menu.html** : `OfferCatalog` ou `ItemList`
- **articulo.html** : `BlogPosting`
- **eventos.html** : NE PAS inclure de schema `Event` avec des dates réelles non fournies (risque SEO). Laisser la structure prête mais commentée.

#### Fichiers SEO à générer :
- `sitemap.xml` : toutes les pages, `lastmod` = date du jour de génération, `priority` cohérente (1.0 accueil, 0.8 pages principales, 0.6 secondaires)
- `robots.txt` : `Allow: /` + lien vers sitemap
- `mapa-del-sitio.html` : plan HTML avec liens vers toutes les pages

### E) Compatibilité Hostinger / Apache
Fichier `.htaccess` avec :
- Compression gzip/deflate (règles prudentes et compatibles)
- Cache-Control pour `/assets/*` (CSS, JS, images : 1 an)
- `Options -Indexes` (désactiver listing répertoires)
- `ErrorDocument 404 /404.html`
- Règles HTTPS et www/non-www **EN COMMENTAIRE** (à activer selon configuration)
- Headers de sécurité basiques (X-Content-Type-Options, X-Frame-Options) **EN COMMENTAIRE** si risque de casser

### F) Contenu : Règles anti-hallucination
- **INTERDIT** d'inventer : nom du propriétaire, histoire datée ("depuis 2012"), certifications, noms de fournisseurs, partenariats, prix réels
- Contenu **générique mais crédible**, ancré localement, orienté expérience
- Menu : items exemples avec note "El menú puede variar según temporada y disponibilidad."
- Événements : exemples génériques + "Próximamente" sans dates réelles
- Avis clients : génériques, sans noms complets inventés

---

## ARBORESCENCE COMPLÈTE À GÉNÉRER

```
/
├── index.html
├── menu.html
├── galeria.html
├── eventos.html
├── sobre-nosotros.html
├── ubicacion.html
├── contacto.html
├── blog.html
├── articulo.html
├── faq.html
├── mapa-del-sitio.html
├── aviso-de-privacidad.html
├── terminos.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── humans.txt
├── security.txt
├── favicon.svg
├── .htaccess
├── /assets/
│   ├── /css/
│   │   └── styles.css
│   ├── /js/
│   │   └── main.js
│   └── /img/
│       ├── logo.svg
│       ├── og-cover.svg
│       └── placeholder-photo.svg
└── /seo/
    ├── google-seo-checklist.md
    ├── metadatas-exemples.md
    └── contenido-palabras-clave.md
```

---

## DESIGN SYSTEM & UX

### Style général
- **Tropical chic premium** : sobre, élégant, lisible, harmonieux
- Palette naturelle : tons sable, vert tropical, terracotta, crème, touches dorées
- Pas de couleurs criardes ni de néons

### Variables CSS obligatoires (dans `:root`)
```css
/* Couleurs */
--color-primary: /* vert tropical profond */;
--color-primary-dark: ;
--color-secondary: /* terracotta/corail */;
--color-accent: /* doré/sable */;
--color-bg: /* crème clair */;
--color-bg-alt: /* blanc cassé */;
--color-text: /* gris foncé chaud */;
--color-text-light: ;
--color-border: ;
--color-success: ;
--color-error: ;

/* Typographie */
--font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-serif: ui-serif, Georgia, 'Times New Roman', serif;
--font-size-base: 1rem;
--line-height-base: 1.6;

/* Espacements */
--space-xs: 0.25rem;
--space-sm: 0.5rem;
--space-md: 1rem;
--space-lg: 2rem;
--space-xl: 4rem;

/* Autres */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 16px;
--shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
--shadow-md: 0 4px 12px rgba(0,0,0,0.1);
--max-width: 1200px;
--header-height: 70px;
```

### Composants à créer
- **Boutons** : `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-icon`
- **Cards** : `.card` avec image, titre, texte, CTA
- **Badges** : `.badge`, `.badge-new`, `.badge-popular`
- **Menu/Tableau** : présentation claire des items avec prix optionnels
- **Accordéons** : FAQ accessible
- **Grille galerie** : responsive, ratio stable
- **Alert/Info box** : `.alert-info`, `.alert-success`, `.alert-warning`

### Header
- Sticky en haut
- Logo + navigation principale
- CTA visibles : "Cómo llegar" + "WhatsApp" (ou "Llamar" si WhatsApp vide)
- Menu hamburger sur mobile avec animation accessible

### Footer
- Adresse complète
- Horaires
- Téléphone cliquable
- Liens : Aviso de privacidad, Términos, Mapa del sitio
- Copyright avec année dynamique

### Micro-blocs anglais
Sur hero, CTA principaux et infos pratiques, ajouter une ligne en anglais en plus de l'espagnol :
- Exemple hero : "Tu oasis tropical en Zipolite" + "Your tropical oasis in Zipolite"
- Exemple horaires : "Abierto todos los días 8:00–15:00" + "Open daily 8am–3pm"

---

## CONTENU DÉTAILLÉ PAR PAGE

### 1. index.html (Accueil)
- **Hero** :
  - H1 : "Café Samsara — Oasis tropical en Zipolite"
  - Sous-texte ES : "Café de especialidad, desayunos artesanales y el mejor brunch frente al Pacífico"
  - Micro-ligne EN : "Specialty coffee & artisan breakfast by the Pacific"
  - 2 CTA : "Ver Menú" (lien menu.html) + "Cómo llegar" (lien ubicacion.html)
- **Section Nuestra oferta** : 4 cards (Café, Desayunos, Jugos, Pastelería) avec icônes/illustrations SVG
- **Section Experiencia** : texte ambiance + placeholder image
- **Section Eventos** : teaser 2-3 événements + lien "Ver todos"
- **Section Testimonios** : 3 avis génériques (prénoms uniquement, ex: "María L.", "Carlos", "Sophie")
- **Section FAQ courte** : 6 questions/réponses les plus fréquentes
- **CTA final** : "¿Listo para tu momento Samsara?" + boutons
- **JSON-LD** : LocalBusiness (CafeOrCoffeeShop) + Organization

### 2. menu.html
- H1 : "Nuestra Carta"
- Note : "El menú puede variar según temporada y disponibilidad."
- **Catégories avec items exemples** :
  - Café & Bebidas (Espresso, Americano, Latte, Cappuccino, Café de olla, Matcha latte, Chocolate caliente, Té chai)
  - Desayunos (Huevos al gusto, Chilaquiles, Hotcakes, Omelette, Molletes, Tostadas de aguacate)
  - Brunch Ligero (Bowl de frutas, Yogurt con granola, Tostadas variadas)
  - Jugos & Smoothies (Jugo verde, Jugo de naranja, Smoothie tropical)
  - Pastelería (Pan de plátano, Muffins, Cookies, Pastel del día)
- Prix optionnels et prudents (ex: "$45", "$85") ou sans prix
- **JSON-LD** : OfferCatalog ou ItemList

### 3. galeria.html
- H1 : "Galería"
- Grille responsive (CSS Grid)
- 9-12 placeholders SVG avec légendes (ex: "Nuestro espacio", "Café recién preparado", "Vista al mar")
- `loading="lazy"`, ratio stable via `aspect-ratio`

### 4. eventos.html
- H1 : "Eventos y Comunidad"
- Intro : "Café Samsara es un punto de encuentro para la comunidad de Zipolite..."
- **Filtres JS** : Todos / Arte / Música / Comunidad
- **Liste événements exemples** (sans dates réelles) :
  - "Noches de música en vivo" (Música)
  - "Exposición de artistas locales" (Arte)
  - "Mercadito comunitario" (Comunidad)
  - "Talleres de café" (Comunidad)
  - "Jam sessions acústicas" (Música)
- Chaque événement : titre, catégorie, description courte, "Próximamente"
- CTA : "¿Quieres participar? Contáctanos"
- **PAS de JSON-LD Event** (dates non fournies)

### 5. ubicacion.html
- H1 : "Cómo Llegar"
- Adresse complète
- Bouton "Abrir en Google Maps" (utilise MAPS_URL)
- **Carte click-to-load** : placeholder cliquable qui charge l'iframe Google Maps au clic (performance + RGPD-friendly)
- Section "Desde..." : repères génériques (ex: "A 5 minutos caminando desde la playa principal", "Cerca de la calle principal del pueblo") — SANS affirmer de faux faits
- Horaires
- **JSON-LD** : BreadcrumbList

### 6. sobre-nosotros.html
- H1 : "Sobre Nosotros"
- **Histoire générique** : "Café Samsara nació del sueño de crear un espacio donde el buen café, la comida casera y la calma del Pacífico se encuentran..." (sans dates, sans noms)
- **Valores** : Calidad artesanal, Comunidad local, Sustentabilidad, Bienestar
- **Bloc "Nuestra promesa"** : engagement qualité
- **FAQ** : 8 questions sur l'histoire, les valeurs, les produits
- **JSON-LD** : BreadcrumbList

### 7. contacto.html
- H1 : "Contacto"
- Coordonnées : adresse, téléphone (lien `tel:`), email, WhatsApp (si configuré)
- Horaires
- **Formulaire accessible** :
  - Nombre (required)
  - Email (required, type="email")
  - Teléfono (optional)
  - Motivo (select : Reservación, Información general, Eventos, Colaboración, Otro)
  - Mensaje (textarea, required)
  - Checkbox consentimiento (required) : "Acepto el aviso de privacidad"
  - **Honeypot** : champ caché pour anti-spam
  - Bouton submit
- Validation JS non bloquante
- Soumission : `mailto:` par défaut, ou endpoint externe si configuré
- **JSON-LD** : BreadcrumbList

### 8. blog.html
- H1 : "Blog — Sabores y Cultura de Zipolite"
- **6 articles SEO locaux** (titre + extrait + lien "Leer más") :
  1. "Los mejores cafés de Oaxaca: una guía para amantes del café"
  2. "Qué hacer en Zipolite: guía completa del paraíso oaxaqueño"
  3. "Desayunos saludables para empezar el día en la playa"
  4. "La cultura del café de especialidad en México"
  5. "Ingredientes locales de Oaxaca que amamos"
  6. "Cómo es un día perfecto en Zipolite"
- **JSON-LD** : BreadcrumbList

### 9. articulo.html (Template article)
- H1 : "[Título del artículo]"
- Meta : auteur générique ("Equipo Café Samsara"), date placeholder
- **Sommaire auto** généré par JS (basé sur H2)
- Structure : intro, H2/H3, paragraphes, encadrés, images placeholder
- CTA fin d'article : "¿Te gustó? Visítanos en Zipolite"
- **JSON-LD** : BlogPosting (avec datePublished, author, headline, image)

### 10. faq.html
- H1 : "Preguntas Frecuentes"
- **12-15 Q/R** couvrant :
  - Horaires, réservations, paiements
  - Menu (végétarien, allergies)
  - Localisation, parking
  - WiFi, ambiance, enfants/animaux
  - Événements, collaborations
  - Produits à emporter
- **Accordéon accessible** avec boutons
- **JSON-LD** : FAQPage

### 11. mapa-del-sitio.html
- H1 : "Mapa del Sitio"
- Liste complète de toutes les pages avec liens

### 12. aviso-de-privacidad.html
- H1 : "Aviso de Privacidad"
- Sections : Responsable, Datos recabados, Finalidades, Transferencias, Derechos ARCO, Cookies, Contacto, Actualizaciones
- Texte générique conforme

### 13. terminos.html
- H1 : "Términos y Condiciones"
- Sections : Uso del sitio, Propiedad intelectual, Limitación de responsabilidad, Enlaces externos, Modificaciones, Ley aplicable
- Texte générique

### 14. 404.html
- H1 : "Página no encontrada"
- Message amical + illustration SVG
- Liens : Inicio, Menú, Contacto

---

## JAVASCRIPT (main.js)

### Objet CONFIG au début
```javascript
const CONFIG = {
  SITE_URL: "https://cafesamsara.example/",
  PHONE_DISPLAY: "+52 56 2360 2203",
  PHONE_TEL: "+525623602203",
  EMAIL: "hola@cafesamsara.example",
  WHATSAPP: "",
  ADDRESS: "Calle Principal s/n, Zipolite, San Pedro Pochutla, Oaxaca, México",
  HOURS: "Lunes a Domingo: 8:00 – 15:00",
  MAPS_URL: "https://maps.google.com/?q=Zipolite,Oaxaca,Mexico",
  CONTACT_ENDPOINT: ""
};
```

### Fonctionnalités à implémenter
1. **Menu mobile accessible** : toggle, aria-expanded, Escape, click-outside, focus trap
2. **Accordéons** : toggle aria-expanded, animation height, navigation clavier
3. **Filtre événements** : filtrage par catégorie sans rechargement
4. **Validation formulaire** : vérification champs, affichage erreurs, détection honeypot
5. **Sommaire auto** : génération basée sur H2 pour articulo.html
6. **Carte click-to-load** : placeholder qui charge iframe au clic
7. **Année dynamique footer** : injection année courante
8. **Smooth scroll** : pour ancres internes (respecter prefers-reduced-motion)

---

## FICHIERS ANNEXES

### robots.txt
```
User-agent: *
Allow: /
Sitemap: https://cafesamsara.example/sitemap.xml
```

### sitemap.xml
- Toutes les pages listées
- `lastmod` : date du jour de génération
- `priority` : 1.0 (accueil), 0.8 (menu, galeria, eventos, sobre-nosotros, ubicacion, contacto, blog), 0.6 (autres)

### site.webmanifest
- name, short_name, icons (favicon.svg), theme_color, background_color

### humans.txt
- Équipe générique, technologies utilisées, date

### security.txt
- Contact, Preferred-Languages, Canonical

### favicon.svg
- Logo simplifié en SVG

### /seo/google-seo-checklist.md
- Étapes : Search Console, soumission sitemap, Google Business Profile, tests Lighthouse, monitoring Core Web Vitals

### /seo/metadatas-exemples.md
- Tableau avec title, description, canonical pour chaque page

### /seo/contenido-palabras-clave.md
- Mots-clés cibles : café Zipolite, desayuno playa Oaxaca, brunch Zipolite, café de especialidad Oaxaca, etc.
- Intentions de recherche
- Idées d'articles SEO

---

## FORMAT DE SORTIE OBLIGATOIRE

1. **Affiche d'abord l'arborescence complète** des fichiers à créer

2. **Génère ensuite chaque fichier COMPLET**, un par un, dans cet ordre :
   - index.html
   - menu.html
   - galeria.html
   - eventos.html
   - sobre-nosotros.html
   - ubicacion.html
   - contacto.html
   - blog.html
   - articulo.html
   - faq.html
   - mapa-del-sitio.html
   - aviso-de-privacidad.html
   - terminos.html
   - 404.html
   - assets/css/styles.css
   - assets/js/main.js
   - assets/img/logo.svg
   - assets/img/og-cover.svg
   - assets/img/placeholder-photo.svg
   - robots.txt
   - sitemap.xml
   - site.webmanifest
   - humans.txt
   - security.txt
   - favicon.svg
   - .htaccess
   - seo/google-seo-checklist.md
   - seo/metadatas-exemples.md
   - seo/contenido-palabras-clave.md

3. **Chaque fichier** doit être présenté ainsi :
   ```
   ## Fichier : [chemin/nom.extension]

   ```[langage]
   [contenu complet du fichier]
   ```
   ```

4. **NE JAMAIS couper un fichier** au milieu. Chaque fichier doit être 100% complet.

5. **Si tu atteins la limite de réponse** avant d'avoir terminé tous les fichiers :
   - Termine le fichier en cours COMPLÈTEMENT
   - Écris exactement sur une nouvelle ligne : `ÉCRIVEZ CONTINUE POUR LA SUITE`
   - Reprends au fichier suivant quand l'utilisateur écrit "CONTINUE"

---

## RAPPELS CRITIQUES

- **Aucune invention** de faits (histoire, dates, noms, certifications)
- **Aucune dépendance externe** (frameworks, CDN, Google Fonts)
- **Accessibilité WCAG 2.2** sur tous les composants interactifs
- **Performance** : un seul CSS, un seul JS, images lazy, pas de bloat
- **SEO** : meta uniques, JSON-LD corrects, sitemap, robots.txt
- **Variables configurables** centralisées dans CONFIG JS et commentaires HTML
- **Fichiers COMPLETS** : ne jamais tronquer

Commence maintenant. Génère l'arborescence puis chaque fichier, un par un, dans l'ordre spécifié.
