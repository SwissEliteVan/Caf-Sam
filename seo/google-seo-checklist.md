# Checklist SEO - Café Samsara

## Pre-Lanzamiento

### 1. Google Search Console
- [ ] Crear propiedad en [Google Search Console](https://search.google.com/search-console)
- [ ] Verificar dominio (DNS TXT record o archivo HTML)
- [ ] Enviar sitemap: `https://cafesamsara.example/sitemap.xml`
- [ ] Verificar cobertura del índice
- [ ] Configurar alertas de errores

### 2. Google Business Profile
- [ ] Crear/reclamar perfil en [Google Business](https://business.google.com/)
- [ ] Categoría principal: "Cafetería"
- [ ] Categorías secundarias: "Restaurante de desayunos", "Brunch"
- [ ] Verificar dirección física
- [ ] Agregar horarios de operación
- [ ] Subir fotos de alta calidad (mínimo 10)
- [ ] Agregar menú con precios
- [ ] Configurar mensajería
- [ ] Agregar atributos: Wi-Fi, Terraza, Pet-friendly, etc.

### 3. Bing Webmaster Tools
- [ ] Crear cuenta en [Bing Webmaster](https://www.bing.com/webmasters)
- [ ] Importar desde Google Search Console
- [ ] Verificar sitemap

---

## Validación Técnica

### 4. Lighthouse / PageSpeed Insights
- [ ] Performance ≥ 90
- [ ] Accessibility ≥ 95
- [ ] Best Practices ≥ 90
- [ ] SEO ≥ 95
- [ ] Probar en móvil y desktop

**Herramienta:** https://pagespeed.web.dev/

### 5. Validación de Schema/Structured Data
- [ ] Validar JSON-LD en [Schema Validator](https://validator.schema.org/)
- [ ] Probar en [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Verificar LocalBusiness schema
- [ ] Verificar FAQPage schema
- [ ] Verificar BreadcrumbList schema

### 6. Core Web Vitals
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] INP (Interaction to Next Paint) < 200ms

### 7. Mobile-Friendly Test
- [ ] Probar en [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [ ] Verificar viewport meta tag
- [ ] Verificar tamaños de tap targets (≥48px)

---

## Contenido y Metadatos

### 8. Títulos y Descripciones
- [ ] Cada página tiene `<title>` único
- [ ] Cada página tiene `<meta name="description">` único
- [ ] Títulos ≤ 60 caracteres
- [ ] Descripciones entre 120-160 caracteres
- [ ] Palabra clave principal en título y descripción

### 9. Open Graph y Twitter Cards
- [ ] Todas las páginas tienen og:title
- [ ] Todas las páginas tienen og:description
- [ ] Todas las páginas tienen og:image (1200x630px)
- [ ] Validar en [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Validar en [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### 10. Imágenes
- [ ] Todas las imágenes tienen atributo `alt`
- [ ] Imágenes optimizadas (WebP preferido)
- [ ] Lazy loading implementado
- [ ] Dimensiones width/height especificadas

---

## Infraestructura

### 11. HTTPS
- [ ] SSL certificado instalado
- [ ] Redirección HTTP → HTTPS activa
- [ ] Sin contenido mixto (mixed content)

### 12. robots.txt
- [ ] Archivo accesible en `/robots.txt`
- [ ] No bloquea recursos importantes (CSS, JS, imágenes)
- [ ] Referencia al sitemap

### 13. sitemap.xml
- [ ] Archivo accesible en `/sitemap.xml`
- [ ] Todas las páginas incluidas
- [ ] URLs absolutas con HTTPS
- [ ] lastmod actualizado

### 14. Canonical URLs
- [ ] Cada página tiene `<link rel="canonical">`
- [ ] URLs sin trailing slash consistentes
- [ ] Preferencia www/non-www consistente

---

## Post-Lanzamiento

### 15. Monitoreo Continuo
- [ ] Configurar Google Analytics 4
- [ ] Revisar Search Console semanalmente
- [ ] Monitorear Core Web Vitals
- [ ] Responder reseñas en Google Business
- [ ] Actualizar contenido regularmente

### 16. Link Building Local
- [ ] Registrar en directorios locales de Oaxaca
- [ ] Contactar blogs de viajes/gastronomía
- [ ] Colaborar con otros negocios de Zipolite
- [ ] Participar en eventos locales

---

## Herramientas Útiles

| Herramienta | URL | Uso |
|-------------|-----|-----|
| PageSpeed Insights | pagespeed.web.dev | Performance |
| Schema Validator | validator.schema.org | Structured Data |
| Rich Results Test | search.google.com/test/rich-results | Schema Testing |
| Mobile-Friendly Test | search.google.com/test/mobile-friendly | Mobile |
| WAVE | wave.webaim.org | Accesibilidad |
| GTmetrix | gtmetrix.com | Performance detallado |
| Screaming Frog | screamingfrog.co.uk | Auditoría técnica |

---

## Notas

- Revisar esta checklist antes de cada actualización mayor
- Documentar cambios en el sitemap con fechas correctas
- Mantener contenido fresco con publicaciones de blog mensuales
