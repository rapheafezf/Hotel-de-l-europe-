const fs = require('fs');

let content = fs.readFileSync('translations.js', 'utf8');
content = content.replace('const translations = ', 'module.exports = ');
fs.writeFileSync('temp_translations.cjs', content);

const translations = require('./temp_translations.cjs');

const additions = {
  fr: {
    comparison: {
      th_prestations: "Prestations",
      th_std: "Standard",
      th_conf: "Confort",
      th_fam: "Familiale",
      cap_max: "Capacité max",
      cap_2: "2 personnes",
      cap_4: "4 personnes",
      superficie: "Superficie",
      sup_14: "Env. 14 m²",
      sup_18: "Env. 18 m²",
      sup_25: "Env. 25 m²",
      literie: "Literie",
      lit_140: "Lit double 140cm",
      lit_160: "Lit Queen 160cm",
      lit_fam: "1 double + 2 simples",
      sdb: "Salle de bain",
      sdb_std: "Douche & WC",
      sdb_conf: "Douche/Bain & WC",
      sdb_fam: "Baignoire, WC séparés",
      wifi: "Wi-Fi Fibre",
      wifi_gratuit: "✓ Gratuit",
      tarif_ind: "Tarif indicatif",
      tarif_75: "À partir de 75€",
      tarif_95: "À partir de 95€",
      tarif_120: "À partir de 120€"
    },
    activite_cards: {
      gorges_tarn_title: "Gorges du Tarn",
      gorges_tarn_dist: "À 5 min — Canoë, baignade",
      village_title: "Village de Meyrueis",
      village_dist: "À pied — Marché & centre historique",
      adresses_title: "Bonnes adresses",
      adresses_dist: "Restaurants & terrasses en vue",
      jonte_title: "Gorges de la Jonte",
      jonte_dist: "À portée — Vautours & falaises",
      aigoual_title: "Mont Aigoual",
      aigoual_dist: "35 km — Panorama 360°",
      histoire_title: "L'hôtel autrefois",
      histoire_dist: "Depuis 1892 — Histoire familiale",
      resto_reco: "+ Le Jardin des Glaces (aligot maison) — Notre recommandation coup de cœur"
    },
    avis_list: {
      a1_text: `"Un séjour parfait dans cet hôtel familial. Accueil chaleureux, chambre propre et confortable, idéalement situé pour explorer les Gorges du Tarn."`,
      a1_date: "Juillet 2025 — Couple",
      a2_text: `"Étape idéale pour notre tour des Cévennes à moto. Parking sécurisé, propriétaires adorables et emplacement parfait. On revient l'année prochaine !"`,
      a2_date: "Août 2025 — Motard",
      a3_text: `"Séjour en famille avec enfants. Chambre familiale spacieuse, accès à la piscine du partenaire très appréciée, village très animé l'été."`,
      a3_date: "Juin 2025 — Famille"
    },
    infos_list: {
      checkin: "Check-in : dès 14h00",
      checkout: "Check-out : jusqu'à 12h00",
      reception: "Réception : 7h à 22h",
      late: "Arrivée tardive : appelez-nous",
      parking1: "Parking privé gratuit",
      parking2: "Garage sécurisé motos/vélos",
      parking3: "2 Quai de la Barrière, 48150 Meyrueis",
      parking4: "A75 sortie Millau → D996",
      serv1: "Wi-Fi Fibre gratuit",
      serv2: "Petit-déjeuner buffet (option)",
      serv3: "Accès piscine partenaire",
      serv4: "Animaux acceptés (8€/nuit)",
      pay1: "Règlement sur place uniquement",
      pay2: "CB, espèces acceptés",
      pay3: "Aucun débit en ligne",
      pay4: "Annulation : contacter l'hôtel",
      good1: "Non-fumeur",
      good2: "Pas d'ascenseur (escalier large)",
      good3: "Lit bébé sur demande (gratuit)",
      good4: "Climatisation naturelle (montagne)",
      contact1: "Tel : +33 (0)4 66 45 60 05",
      contact2: "Email : contact@hotel-europe-meyrueis.com",
      contact3: "Réponse sous 24h max",
      contact4: "Ouvert du 1er mai au 15 octobre"
    },
    booking: {
      room_std: "Standard",
      room_conf: "Confort",
      room_fam: "Familiale",
      from: "Du",
      to: "au",
      nights: "nuit(s)",
      guests: "voyageur(s)"
    },
    alerts: {
      thanks: "Merci",
      sent: "votre message a bien été envoyé !\\n\\nNotre équipe vous contactera dans les plus brefs délais.\\nTél. : 04 66 45 60 05",
      contact_resto: "Contactez-nous au 04 66 45 60 05 pour une réservation table !"
    },
    activiteData: {
      gorges_tarn: {
        title: 'Gorges du Tarn',
        badge: 'À 5 min',
        desc: `Les Gorges du Tarn sont l'un des joyaux naturels du Massif Central. Taillées dans les causses calcaires sur plus de 50 km, elles offrent des paysages à couper le souffle avec leurs falaises vertigineuses, leur rivière turquoise et leurs villages perchés. Depuis Meyrueis, vous y êtes en quelques minutes — un terrain de jeu exceptionnel pour toute la famille.`,
        info: [
          { label: 'Distance', value: '~5 km (10 min)' },
          { label: 'Saison', value: 'Juin à Septembre' },
          { label: 'Public', value: 'Familles, sportifs' }
        ],
        highlights: ['Descente en canoë sur le Tarn (prestataires à Meyrueis)', 'Baignade dans des eaux cristallines et naturelles', 'Randonnée sur les corniches des Causses', 'Villages perchés : Sainte-Énimie, La Malène', 'Pêche en rivière (truites, ombres communs)', 'Escalade sur les falaises calcaires'],
        footer: "L'hôtel peut vous recommander les meilleurs prestataires de canoë de la région.",
        tags_labels: ['Canoë-Kayak', 'Baignade', 'Randonnée', 'Nature']
      },
      village_meyrueis: {
        title: 'Village de Meyrueis',
        badge: 'À pied',
        desc: `Meyrueis est un village chargé d'histoire, fondé au Moyen Âge et marqué par les guerres de religion. Situé au confluent de la Jonte, de la Brèze et du Béthuzon, c'est un carrefour naturel entre les Causses et les Cévennes. Son marché traditionnel du mercredi matin, ses ruelles pavées et son château d'Ayres du XIIe siècle en font une étape incontournable.`,
        info: [
          { label: 'Accès', value: '2 min à pied' },
          { label: 'Marché', value: 'Mercredi matin' },
          { label: 'Histoire', value: 'Depuis le Xe siècle' }
        ],
        highlights: ["Marché hebdomadaire du mercredi (produits du terroir)", "Château d'Ayres — ancien monastère du XIIe siècle", "Tour de l'Horloge et ruelles médiévales", "Foire de la Saint-Michel (fin septembre, 800 ans d'histoire)", "Temple protestant (1840) et maisons Renaissance", "Office de Tourisme — infos randonnées et activités"],
        footer: "À seulement 2 min à pied de l'hôtel — parfait pour une promenade du soir.",
        tags_labels: ['Village médiéval', 'Marché', 'Patrimoine', 'Gastronomie']
      },
      bonnes_adresses: {
        title: 'Bonnes adresses',
        badge: 'Au village',
        desc: `Meyrueis regorge de bonnes tables proposant la cuisine authentique des Causses et des Cévennes. Gibier, truites, fromages de Lozère, miel du Parc national... Notre équipe connaît chaque adresse et se fera un plaisir de vous orienter selon vos envies. La vue depuis certaines terrasses sur la Jonte et les falaises est simplement inoubliable.`,
        info: [
          { label: 'Cuisine', value: 'Terroir Causses' },
          { label: 'Distance', value: 'Moins de 5 min' },
          { label: 'Service', value: 'Midi & soir' }
        ],
        highlights: ['Le Jardin des Glaces — aligot maison (notre coup de coeur !)', 'Auberge du Doiron — spécialités gibier et truites', 'La Truite — poissons de rivière en bord de Jonte', 'Le Belvedere — terrasse panoramique sur les gorges', 'Restaurant de la Jonte — cadre naturel exceptionnel', 'Le Moulin de la Foux — ancienne meunerie reconvertie'],
        footer: 'Notre réception peut vous aider à réserver une table selon vos préférences.',
        tags_labels: ['Restaurants', 'Terroir', 'Gastronomie', 'Terrasses']
      },
      gorges_jonte: {
        title: 'Gorges de la Jonte',
        badge: 'À portée',
        desc: `Les Gorges de la Jonte, classées Grand Site de France, sont le paradis des vautours réintroduits dans les années 1980. Depuis la Maison des Vautours à Saint-Pierre-des-Tripiers, vous pouvez observer en direct ces rapaces majestueux évoluer dans le ciel des falaises calcaires. Un spectacle naturel unique en Europe.`,
        info: [
          { label: 'Distance', value: '~8 km de Meyrueis' },
          { label: 'Ouverture', value: 'Avr. à Nov.' },
          { label: 'Site', value: 'Grand Site de France' }
        ],
        highlights: ['Maison des Vautours — musée 1000m² sur les rapaces', '4 espèces : Vautour fauve, Moine, Percnoptère, Gypaète barbu', 'Caméras en direct sur les nids et aires de nourrissage', 'Terrasse panoramique avec longues-vues', 'Randonnées sur les corniches (vues plongeantes)', 'Observation des chevaux de Przewalski sur le Causse Méjean'],
        footer: 'Maison des Vautours : 05 65 62 69 69 — Idéal avec les enfants !',
        tags_labels: ['Vautours', 'Falaises', 'Grand Site', 'Panorama']
      },
      mont_aigoual: {
        title: 'Mont Aigoual',
        badge: '35 km',
        desc: `Le Mont Aigoual culmine à 1 567 mètres, point culminant du Gard. Son observatoire inauguré en 1894, toujours actif, abrite "Le Climatographe" — le premier centre européen dédié au changement climatique. Par temps clair, la vue embrasse un quart de la France, des Alpes aux Pyrénées jusqu'à la mer Méditerranée.`,
        info: [
          { label: 'Distance', value: '35 km (45 min)' },
          { label: 'Altitude', value: '1 567 m' },
          { label: 'Ouverture', value: 'Avr. à Oct.' }
        ],
        highlights: ['Le Climatographe — 10 espaces interactifs sur le climat', 'Panorama 360° : Alpes, Pyrénées, Méditerranée visible', 'Station Météo-France active depuis 1894', 'Ateliers pédagogiques pour enfants', 'Conférences thématiques en juillet-août', 'Prévoir vêtements chauds même en été (vent et brouillard)'],
        footer: 'Climatographe : 04 67 42 59 83 — climatographe.fr',
        tags_labels: ['1 567 m', 'Météo', 'Panorama 360°', 'Cévennes']
      },
      hotel_autrefois: {
        title: "L'hôtel autrefois",
        badge: 'Depuis 1892',
        desc: `L'Hôtel de l'Europe est une institution de Meyrueis. Fondé à la fin du XIXe siècle, il est transmis de génération en génération dans la même famille depuis plus de 130 ans. Cette photo ancienne témoigne d'une époque où l'hôtel était déjà le coeur battant de la vie locale, accueillant voyageurs, marchands et touristes dans un esprit d'hospitalité authentique qui n'a jamais changé.`,
        info: [
          { label: 'Fondé en', value: '1892' },
          { label: 'Générations', value: '5 familles' },
          { label: 'Chambres', value: '29 chambres' }
        ],
        highlights: ["Plus de 130 ans d'hospitalité familiale ininterrompue", "Même esprit d'accueil chaleureux depuis les origines", "Témoin de l'histoire de Meyrueis et de la Lozère", "Rénovations successives préservant l'âme du lieu", "Parking privé — une rareté dans ce village historique", "Aujourd'hui : Wi-Fi Fibre et confort moderne"],
        footer: "L'histoire continue... Merci de faire partie de notre aventure familiale.",
        tags_labels: ['Histoire', '5 Générations', 'Patrimoine', 'Familial']
      }
    }
  },
  en: {
    comparison: {
      th_prestations: "Features", th_std: "Standard", th_conf: "Comfort", th_fam: "Family",
      cap_max: "Max capacity", cap_2: "2 people", cap_4: "4 people",
      superficie: "Area", sup_14: "Approx. 14 m²", sup_18: "Approx. 18 m²", sup_25: "Approx. 25 m²",
      literie: "Bedding", lit_140: "Double bed 140cm", lit_160: "Queen bed 160cm", lit_fam: "1 double + 2 single",
      sdb: "Bathroom", sdb_std: "Shower & WC", sdb_conf: "Shower/Bath & WC", sdb_fam: "Bathtub, separate WC",
      wifi: "Fiber Wi-Fi", wifi_gratuit: "✓ Free", tarif_ind: "Indicative rate",
      tarif_75: "From 75€", tarif_95: "From 95€", tarif_120: "From 120€"
    },
    activite_cards: {
      gorges_tarn_title: "Tarn Gorges", gorges_tarn_dist: "5 min away — Canoe, swim",
      village_title: "Village of Meyrueis", village_dist: "Walking distance — Market & history",
      adresses_title: "Good Addresses", adresses_dist: "Restaurants & terraces",
      jonte_title: "Jonte Gorges", jonte_dist: "Nearby — Vultures & cliffs",
      aigoual_title: "Mont Aigoual", aigoual_dist: "35 km — 360° Panorama",
      histoire_title: "The hotel in the past", histoire_dist: "Since 1892 — Family history",
      resto_reco: "+ Le Jardin des Glaces (homemade aligot) — Our favorite recommendation"
    },
    avis_list: {
      a1_text: `"A perfect stay in this family hotel. Warm welcome, clean and comfortable room, ideally located for exploring the Tarn Gorges."`, a1_date: "July 2025 — Couple",
      a2_text: `"Ideal stopover for our motorcycle tour of the Cevennes. Secure parking, lovely owners and perfect location. We will be back next year!"`, a2_date: "August 2025 — Biker",
      a3_text: `"Family stay with children. Spacious family room, highly appreciated access to partner's pool, very lively village in summer."`, a3_date: "June 2025 — Family"
    },
    infos_list: {
      checkin: "Check-in: from 2:00 PM", checkout: "Check-out: until 12:00 PM",
      reception: "Reception: 7 AM to 10 PM", late: "Late arrival: please call us",
      parking1: "Free private parking", parking2: "Secure garage for bikes/motorcycles",
      parking3: "2 Quai de la Barrière, 48150 Meyrueis", parking4: "A75 exit Millau → D996",
      serv1: "Free Fiber Wi-Fi", serv2: "Buffet breakfast (optional)",
      serv3: "Partner pool access", serv4: "Pets allowed (8€/night)",
      pay1: "Payment on site only", pay2: "Credit card, cash accepted",
      pay3: "No online charge", pay4: "Cancellation: contact the hotel",
      good1: "Non-smoking", good2: "No elevator (wide stairs)",
      good3: "Baby cot on request (free)", good4: "Natural air conditioning (mountain)",
      contact1: "Phone: +33 (0)4 66 45 60 05", contact2: "Email: contact@hotel-europe-meyrueis.com",
      contact3: "Response within 24h max", contact4: "Open from May 1st to October 15th"
    },
    booking: { room_std: "Standard", room_conf: "Comfort", room_fam: "Family", from: "From", to: "to", nights: "night(s)", guests: "guest(s)" },
    alerts: { thanks: "Thank you", sent: "your message has been successfully sent!\\n\\nOur team will contact you shortly.\\nPhone: +33 4 66 45 60 05", contact_resto: "Contact us at +33 4 66 45 60 05 to book a table!" },
    activiteData: {
      gorges_tarn: {
        title: 'Tarn Gorges', badge: '5 min away', desc: `The Tarn Gorges are one of the natural jewels of the Massif Central. Carved into the limestone plateaus over 50 km, they offer breathtaking landscapes with vertiginous cliffs, a turquoise river, and perched villages. From Meyrueis, you are there in minutes.`,
        info: [{ label: 'Distance', value: '~5 km (10 min)' }, { label: 'Season', value: 'June to September' }, { label: 'Audience', value: 'Families, sporty' }],
        highlights: ['Canoeing down the Tarn', 'Swimming in crystal clear natural waters', 'Hiking on the Causses cornices', 'Perched villages: Sainte-Énimie, La Malène', 'River fishing', 'Rock climbing on limestone cliffs'],
        footer: "The hotel can recommend the best canoe providers in the region.", tags_labels: ['Canoeing', 'Swimming', 'Hiking', 'Nature']
      },
      village_meyrueis: {
        title: 'Village of Meyrueis', badge: 'Walking distance', desc: `Meyrueis is a village steeped in history, founded in the Middle Ages. Located at the confluence of the Jonte, Brèze, and Béthuzon rivers, it's a natural crossroads between the Causses and the Cevennes. Its traditional Wednesday morning market and cobblestone streets make it a must-see.`,
        info: [{ label: 'Access', value: '2 min walk' }, { label: 'Market', value: 'Wednesday morning' }, { label: 'History', value: 'Since the 10th century' }],
        highlights: ["Weekly Wednesday market (local products)", "Château d'Ayres — former 12th-century monastery", "Clock Tower and medieval streets", "Saint-Michel Fair (late September, 800 years of history)", "Protestant temple (1840)", "Tourist Office — hiking info"],
        footer: "Only a 2 min walk from the hotel.", tags_labels: ['Medieval village', 'Market', 'Heritage', 'Gastronomy']
      },
      bonnes_adresses: {
        title: 'Good Addresses', badge: 'In the village', desc: `Meyrueis is full of great restaurants offering authentic Causses and Cevennes cuisine. Game, trout, Lozere cheeses, National Park honey... Our team knows every address and will gladly guide you.`,
        info: [{ label: 'Cuisine', value: 'Local Causses' }, { label: 'Distance', value: 'Less than 5 min' }, { label: 'Service', value: 'Lunch & dinner' }],
        highlights: ['Le Jardin des Glaces — homemade aligot (our favorite!)', 'Auberge du Doiron — game and trout specialties', 'La Truite — river fish by the Jonte', 'Le Belvedere — panoramic terrace over the gorges', 'Restaurant de la Jonte — exceptional natural setting', 'Le Moulin de la Foux — converted old mill'],
        footer: 'Our reception can help you book a table.', tags_labels: ['Restaurants', 'Local food', 'Gastronomy', 'Terraces']
      },
      gorges_jonte: {
        title: 'Jonte Gorges', badge: 'Nearby', desc: `The Jonte Gorges, classified as a Grand Site of France, are a paradise for vultures reintroduced in the 1980s. From the Vulture House in Saint-Pierre-des-Tripiers, you can watch these majestic raptors flying live in the sky over the limestone cliffs.`,
        info: [{ label: 'Distance', value: '~8 km from Meyrueis' }, { label: 'Open', value: 'Apr. to Nov.' }, { label: 'Site', value: 'Grand Site of France' }],
        highlights: ['Vulture House — 1000m² museum on raptors', '4 species: Griffon, Black, Egyptian, and Bearded vultures', 'Live cameras on nests', 'Panoramic terrace with telescopes', 'Hiking on the cornices', 'Observation of Przewalski horses on the Causse Méjean'],
        footer: 'Vulture House: +33 5 65 62 69 69 — Great with kids!', tags_labels: ['Vultures', 'Cliffs', 'Grand Site', 'Panorama']
      },
      mont_aigoual: {
        title: 'Mont Aigoual', badge: '35 km', desc: `Mont Aigoual culminates at 1,567 meters. Its observatory, inaugurated in 1894, houses "The Climatograph" — Europe's first center dedicated to climate change. On a clear day, the view covers a quarter of France.`,
        info: [{ label: 'Distance', value: '35 km (45 min)' }, { label: 'Altitude', value: '1,567 m' }, { label: 'Open', value: 'Apr. to Oct.' }],
        highlights: ['The Climatograph — 10 interactive climate spaces', '360° panorama: Alps, Pyrenees, Mediterranean visible', 'Météo-France station active since 1894', 'Educational workshops for children', 'Thematic conferences in July-August', 'Bring warm clothes even in summer (wind and fog)'],
        footer: 'Climatograph: +33 4 67 42 59 83 — climatographe.fr', tags_labels: ['1,567 m', 'Weather', '360° Panorama', 'Cevennes']
      },
      hotel_autrefois: {
        title: "The hotel in the past", badge: 'Since 1892', desc: `Hotel de l'Europe is an institution in Meyrueis. Founded in the late 19th century, it has been passed down from generation to generation in the same family for over 130 years.`,
        info: [{ label: 'Founded in', value: '1892' }, { label: 'Generations', value: '5 families' }, { label: 'Rooms', value: '29 rooms' }],
        highlights: ["Over 130 years of uninterrupted family hospitality", "Same spirit of warm welcome since the beginning", "Witness to the history of Meyrueis and Lozere", "Successive renovations preserving the soul of the place", "Private parking — a rarity in this historic village", "Today: Fiber Wi-Fi and modern comfort"],
        footer: "The story continues... Thank you for being part of our family adventure.", tags_labels: ['History', '5 Generations', 'Heritage', 'Family']
      }
    }
  },
  es: {
    comparison: {
      th_prestations: "Servicios", th_std: "Estándar", th_conf: "Confort", th_fam: "Familiar",
      cap_max: "Capacidad máx", cap_2: "2 personas", cap_4: "4 personas",
      superficie: "Superficie", sup_14: "Aprox. 14 m²", sup_18: "Aprox. 18 m²", sup_25: "Aprox. 25 m²",
      literie: "Camas", lit_140: "Cama doble 140cm", lit_160: "Cama Queen 160cm", lit_fam: "1 doble + 2 individuales",
      sdb: "Baño", sdb_std: "Ducha y WC", sdb_conf: "Ducha/Bañera y WC", sdb_fam: "Bañera, WC separado",
      wifi: "Wi-Fi Fibra", wifi_gratuit: "✓ Gratis", tarif_ind: "Tarifa indicativa",
      tarif_75: "Desde 75€", tarif_95: "Desde 95€", tarif_120: "Desde 120€"
    },
    activite_cards: {
      gorges_tarn_title: "Gargantas del Tarn", gorges_tarn_dist: "A 5 min — Canoa, baño",
      village_title: "Pueblo de Meyrueis", village_dist: "A pie — Mercado e historia",
      adresses_title: "Buenas Direcciones", adresses_dist: "Restaurantes y terrazas",
      jonte_title: "Gargantas de la Jonte", jonte_dist: "Cerca — Buitres y acantilados",
      aigoual_title: "Mont Aigoual", aigoual_dist: "35 km — Panorama 360°",
      histoire_title: "El hotel en el pasado", histoire_dist: "Desde 1892 — Historia familiar",
      resto_reco: "+ Le Jardin des Glaces (aligot casero) — Nuestra recomendación favorita"
    },
    avis_list: {
      a1_text: `"Una estancia perfecta en este hotel familiar. Cálida bienvenida, habitación limpia y cómoda, idealmente situado para explorar las Gargantas del Tarn."`, a1_date: "Julio 2025 — Pareja",
      a2_text: `"Parada ideal para nuestro recorrido en moto por las Cevenas. Aparcamiento seguro, propietarios encantadores y ubicación perfecta. ¡Volveremos el año que viene!"`, a2_date: "Agosto 2025 — Motero",
      a3_text: `"Estancia en familia con niños. Amplia habitación familiar, acceso a la piscina del socio muy apreciado, pueblo muy animado en verano."`, a3_date: "Junio 2025 — Familia"
    },
    infos_list: {
      checkin: "Check-in: desde las 14:00", checkout: "Check-out: hasta las 12:00",
      reception: "Recepción: 7h a 22h", late: "Llegada tardía: por favor llámenos",
      parking1: "Aparcamiento privado gratuito", parking2: "Garaje seguro motos/bicis",
      parking3: "2 Quai de la Barrière, 48150 Meyrueis", parking4: "A75 salida Millau → D996",
      serv1: "Wi-Fi Fibra gratuito", serv2: "Desayuno buffet (opcional)",
      serv3: "Acceso piscina asociada", serv4: "Mascotas permitidas (8€/noche)",
      pay1: "Pago en el hotel únicamente", pay2: "Tarjetas y efectivo aceptados",
      pay3: "Sin cargos online", pay4: "Cancelación: contactar al hotel",
      good1: "No fumadores", good2: "Sin ascensor (escaleras anchas)",
      good3: "Cuna bajo petición (gratis)", good4: "Aire acondicionado natural (montaña)",
      contact1: "Tel: +33 (0)4 66 45 60 05", contact2: "Email: contact@hotel-europe-meyrueis.com",
      contact3: "Respuesta en 24h máx", contact4: "Abierto del 1 de mayo al 15 de octubre"
    },
    booking: { room_std: "Estándar", room_conf: "Confort", room_fam: "Familiar", from: "Del", to: "al", nights: "noche(s)", guests: "huésped(es)" },
    alerts: { thanks: "Gracias", sent: "¡su mensaje ha sido enviado con éxito!\\n\\nNuestro equipo se pondrá en contacto con usted en breve.\\nTel: +33 4 66 45 60 05", contact_resto: "¡Contáctenos al +33 4 66 45 60 05 para reservar una mesa!" },
    activiteData: {
      gorges_tarn: {
        title: 'Gargantas del Tarn', badge: 'A 5 min', desc: `Las Gargantas del Tarn son una de las joyas naturales del Macizo Central. Ofrecen paisajes impresionantes con sus acantilados, su río turquesa y sus pueblos colgados.`,
        info: [{ label: 'Distancia', value: '~5 km (10 min)' }, { label: 'Temporada', value: 'Junio a Septiembre' }, { label: 'Público', value: 'Familias, deportistas' }],
        highlights: ['Descenso en canoa por el Tarn', 'Baño en aguas cristalinas y naturales', 'Senderismo por las cornisas', 'Pueblos colgados: Sainte-Énimie, La Malène', 'Pesca en el río', 'Escalada en los acantilados calcáreos'],
        footer: "El hotel puede recomendarle los mejores proveedores de canoas.", tags_labels: ['Canoa', 'Baño', 'Senderismo', 'Naturaleza']
      },
      village_meyrueis: {
        title: 'Pueblo de Meyrueis', badge: 'A pie', desc: `Meyrueis es un pueblo lleno de historia. Su mercado tradicional los miércoles por la mañana, sus calles empedradas y su castillo del siglo XII lo convierten en una parada obligatoria.`,
        info: [{ label: 'Acceso', value: 'A 2 min a pie' }, { label: 'Mercado', value: 'Miércoles por la mañana' }, { label: 'Historia', value: 'Desde el siglo X' }],
        highlights: ["Mercado semanal (productos locales)", "Château d'Ayres — antiguo monasterio", "Torre del Reloj y calles medievales", "Feria de San Miguel", "Templo protestante (1840)", "Oficina de Turismo"],
        footer: "A sólo 2 minutos a pie del hotel.", tags_labels: ['Pueblo medieval', 'Mercado', 'Patrimonio', 'Gastronomía']
      },
      bonnes_adresses: {
        title: 'Buenas Direcciones', badge: 'En el pueblo', desc: `Meyrueis está lleno de excelentes restaurantes. Caza, truchas, quesos de Lozère... Nuestro equipo conoce cada lugar y le orientará con gusto.`,
        info: [{ label: 'Cocina', value: 'Local Causses' }, { label: 'Distancia', value: 'Menos de 5 min' }, { label: 'Servicio', value: 'Comida y cena' }],
        highlights: ['Le Jardin des Glaces — aligot casero (¡nuestro favorito!)', 'Auberge du Doiron — especialidades de caza y trucha', 'La Truite — pescado de río', 'Le Belvedere — terraza panorámica', 'Restaurant de la Jonte — entorno natural', 'Le Moulin de la Foux — antiguo molino'],
        footer: 'Nuestra recepción puede ayudarle a reservar una mesa.', tags_labels: ['Restaurantes', 'Comida local', 'Gastronomía', 'Terrazas']
      },
      gorges_jonte: {
        title: 'Gargantas de la Jonte', badge: 'Cerca', desc: `Las Gargantas de la Jonte son el paraíso de los buitres reintroducidos en los años 1980. Desde la Casa de los Buitres, puede observar estas majestuosas aves en directo.`,
        info: [{ label: 'Distancia', value: '~8 km de Meyrueis' }, { label: 'Apertura', value: 'Abr. a Nov.' }, { label: 'Sitio', value: 'Grand Site de France' }],
        highlights: ['Casa de los Buitres — museo de 1000m²', '4 especies de buitres', 'Cámaras en directo en los nidos', 'Terraza panorámica', 'Senderismo por las cornisas', 'Caballos de Przewalski en el Causse Méjean'],
        footer: 'Casa de los Buitres: +33 5 65 62 69 69 — ¡Ideal con niños!', tags_labels: ['Buitres', 'Acantilados', 'Gran Sitio', 'Panorama']
      },
      mont_aigoual: {
        title: 'Mont Aigoual', badge: '35 km', desc: `El Mont Aigoual culmina a 1.567 metros. Su observatorio alberga "El Climatólogo" — el primer centro europeo dedicado al cambio climático.`,
        info: [{ label: 'Distancia', value: '35 km (45 min)' }, { label: 'Altitud', value: '1.567 m' }, { label: 'Apertura', value: 'Abr. a Oct.' }],
        highlights: ['El Climatólogo — 10 espacios interactivos', 'Panorama de 360°', 'Estación Météo-France activa desde 1894', 'Talleres educativos para niños', 'Conferencias temáticas', 'Lleve ropa de abrigo incluso en verano'],
        footer: 'Climatólogo: +33 4 67 42 59 83 — climatographe.fr', tags_labels: ['1.567 m', 'Clima', 'Panorama 360°', 'Cevenas']
      },
      hotel_autrefois: {
        title: "El hotel en el pasado", badge: 'Desde 1892', desc: `El Hotel de l'Europe es una institución en Meyrueis. Fundado a finales del siglo XIX, se ha transmitido de generación en generación en la misma familia.`,
        info: [{ label: 'Fundado en', value: '1892' }, { label: 'Generaciones', value: '5 familias' }, { label: 'Habitaciones', value: '29 hab.' }],
        highlights: ["Más de 130 años de hospitalidad familiar ininterrumpida", "El mismo espíritu de cálida bienvenida", "Testigo de la historia de Meyrueis", "Renovaciones sucesivas preservando el alma", "Aparcamiento privado — una rareza en este pueblo", "Hoy: Wi-Fi Fibra y confort moderno"],
        footer: "La historia continúa... Gracias por ser parte de nuestra aventura.", tags_labels: ['Historia', '5 Generaciones', 'Patrimonio', 'Familiar']
      }
    }
  },
  de: {
    comparison: {
      th_prestations: "Ausstattung", th_std: "Standard", th_conf: "Komfort", th_fam: "Familie",
      cap_max: "Max Kapazität", cap_2: "2 Personen", cap_4: "4 Personen",
      superficie: "Fläche", sup_14: "Ca. 14 m²", sup_18: "Ca. 18 m²", sup_25: "Ca. 25 m²",
      literie: "Betten", lit_140: "Doppelbett 140cm", lit_160: "Queen-Bett 160cm", lit_fam: "1 Doppel- + 2 Einzelbetten",
      sdb: "Badezimmer", sdb_std: "Dusche & WC", sdb_conf: "Dusche/Badewanne & WC", sdb_fam: "Badewanne, separates WC",
      wifi: "Glasfaser-WLAN", wifi_gratuit: "✓ Kostenlos", tarif_ind: "Richtpreis",
      tarif_75: "Ab 75€", tarif_95: "Ab 95€", tarif_120: "Ab 120€"
    },
    activite_cards: {
      gorges_tarn_title: "Tarnschlucht", gorges_tarn_dist: "5 Min entfernt — Kanu, Schwimmen",
      village_title: "Dorf Meyrueis", village_dist: "Zu Fuß — Markt & Geschichte",
      adresses_title: "Gute Adressen", adresses_dist: "Restaurants & Terrassen",
      jonte_title: "Jonteschlucht", jonte_dist: "In der Nähe — Geier & Klippen",
      aigoual_title: "Mont Aigoual", aigoual_dist: "35 km — 360° Panorama",
      histoire_title: "Das Hotel in der Vergangenheit", histoire_dist: "Seit 1892 — Familiengeschichte",
      resto_reco: "+ Le Jardin des Glaces (hausgemachtes Aligot) — Unsere Lieblingsempfehlung"
    },
    avis_list: {
      a1_text: `"Ein perfekter Aufenthalt in diesem Familienhotel. Herzlicher Empfang, sauberes und komfortables Zimmer, ideal gelegen, um die Tarnschlucht zu erkunden."`, a1_date: "Juli 2025 — Paar",
      a2_text: `"Idealer Zwischenstopp für unsere Motorradtour durch die Cevennen. Sicherer Parkplatz, nette Besitzer und perfekte Lage. Wir kommen nächstes Jahr wieder!"`, a2_date: "August 2025 — Motorradfahrer",
      a3_text: `"Familienurlaub mit Kindern. Geräumiges Familienzimmer, der Zugang zum Partnerpool wurde sehr geschätzt, ein sehr lebhaftes Dorf im Sommer."`, a3_date: "Juni 2025 — Familie"
    },
    infos_list: {
      checkin: "Check-in: ab 14:00 Uhr", checkout: "Check-out: bis 12:00 Uhr",
      reception: "Rezeption: 7 bis 22 Uhr", late: "Späte Ankunft: bitte rufen Sie uns an",
      parking1: "Kostenloser Privatparkplatz", parking2: "Sichere Garage für Fahrräder/Motorräder",
      parking3: "2 Quai de la Barrière, 48150 Meyrueis", parking4: "A75 Ausfahrt Millau → D996",
      serv1: "Kostenloses Glasfaser-WLAN", serv2: "Frühstücksbuffet (optional)",
      serv3: "Zugang zum Partnerpool", serv4: "Haustiere erlaubt (8€/Nacht)",
      pay1: "Zahlung nur vor Ort", pay2: "Kreditkarte, Bargeld akzeptiert",
      pay3: "Keine Online-Zahlung", pay4: "Stornierung: Kontaktieren Sie das Hotel",
      good1: "Nichtraucher", good2: "Kein Aufzug (breite Treppen)",
      good3: "Babybett auf Anfrage (kostenlos)", good4: "Natürliche Klimaanlage (Bergluft)",
      contact1: "Tel: +33 (0)4 66 45 60 05", contact2: "E-Mail: contact@hotel-europe-meyrueis.com",
      contact3: "Antwort innerhalb 24h", contact4: "Geöffnet vom 1. Mai bis 15. Oktober"
    },
    booking: { room_std: "Standard", room_conf: "Komfort", room_fam: "Familie", from: "Vom", to: "bis", nights: "Nacht(Nächte)", guests: "Gast(Gäste)" },
    alerts: { thanks: "Danke", sent: "Ihre Nachricht wurde erfolgreich gesendet!\\n\\nUnser Team wird sich in Kürze mit Ihnen in Verbindung setzen.\\nTel: +33 4 66 45 60 05", contact_resto: "Kontaktieren Sie uns unter +33 4 66 45 60 05, um einen Tisch zu reservieren!" },
    activiteData: {
      gorges_tarn: {
        title: 'Tarnschlucht', badge: '5 Min entfernt', desc: `Die Tarnschlucht ist eines der Naturjuwele des Zentralmassivs. Sie bietet atemberaubende Landschaften mit steilen Klippen, einem türkisfarbenen Fluss und hochgelegenen Dörfern.`,
        info: [{ label: 'Entfernung', value: '~5 km (10 Min)' }, { label: 'Saison', value: 'Juni bis September' }, { label: 'Publikum', value: 'Familien, Sportliche' }],
        highlights: ['Kanu fahren auf dem Tarn', 'Schwimmen in kristallklarem Naturwasser', 'Wandern auf den Klippen', 'Hochgelegene Dörfer: Sainte-Énimie, La Malène', 'Flussangeln', 'Felsklettern'],
        footer: "Das Hotel kann Ihnen die besten Kanuanbieter empfehlen.", tags_labels: ['Kanu', 'Schwimmen', 'Wandern', 'Natur']
      },
      village_meyrueis: {
        title: 'Dorf Meyrueis', badge: 'Zu Fuß', desc: `Meyrueis ist ein geschichtsträchtiges Dorf, das im Mittelalter gegründet wurde. Der traditionelle Markt am Mittwochmorgen und das Château d'Ayres aus dem 12. Jahrhundert machen es zu einem Muss.`,
        info: [{ label: 'Zugang', value: '2 Min zu Fuß' }, { label: 'Markt', value: 'Mittwochmorgen' }, { label: 'Geschichte', value: 'Seit dem 10. Jahrhundert' }],
        highlights: ["Wöchentlicher Markt (lokale Produkte)", "Château d'Ayres — ehemaliges Kloster", "Uhrturm und mittelalterliche Straßen", "Saint-Michel Messe", "Protestantischer Tempel", "Touristeninformation"],
        footer: "Nur 2 Gehminuten vom Hotel entfernt.", tags_labels: ['Mittelalterliches Dorf', 'Markt', 'Erbe', 'Gastronomie']
      },
      bonnes_adresses: {
        title: 'Gute Adressen', badge: 'Im Dorf', desc: `Meyrueis ist voll von großartigen Restaurants, die authentische Küche der Causses und Cevennen anbieten. Unser Team kennt jede Adresse und berät Sie gerne.`,
        info: [{ label: 'Küche', value: 'Lokal Causses' }, { label: 'Entfernung', value: 'Weniger als 5 Min' }, { label: 'Service', value: 'Mittag & Abend' }],
        highlights: ['Le Jardin des Glaces — hausgemachtes Aligot', 'Auberge du Doiron — Wild und Forelle', 'La Truite — Flussfisch', 'Le Belvedere — Panoramaterrasse', 'Restaurant de la Jonte — Naturkulisse', 'Le Moulin de la Foux — umgebaute alte Mühle'],
        footer: 'Unsere Rezeption hilft Ihnen gerne bei der Tischreservierung.', tags_labels: ['Restaurants', 'Lokales Essen', 'Gastronomie', 'Terrassen']
      },
      gorges_jonte: {
        title: 'Jonteschlucht', badge: 'In der Nähe', desc: `Die Jonteschlucht ist ein Paradies für Geier, die in den 1980er Jahren wiederangesiedelt wurden. Vom Haus der Geier aus können Sie diese majestätischen Raubvögel live beobachten.`,
        info: [{ label: 'Entfernung', value: '~8 km von Meyrueis' }, { label: 'Geöffnet', value: 'Apr. bis Nov.' }, { label: 'Ort', value: 'Grand Site de France' }],
        highlights: ['Haus der Geier — 1000m² Museum', '4 Geierarten', 'Live-Kameras auf Nestern', 'Panoramaterrasse', 'Wandern auf den Felsvorsprüngen', 'Przewalski-Pferde auf dem Causse Méjean'],
        footer: 'Haus der Geier: +33 5 65 62 69 69 — Toll mit Kindern!', tags_labels: ['Geier', 'Klippen', 'Grand Site', 'Panorama']
      },
      mont_aigoual: {
        title: 'Mont Aigoual', badge: '35 km', desc: `Der Mont Aigoual gipfelt auf 1.567 Metern. Sein Observatorium beherbergt "Den Klimatographen" — Europas erstes Zentrum für Klimawandel.`,
        info: [{ label: 'Entfernung', value: '35 km (45 Min)' }, { label: 'Höhe', value: '1.567 m' }, { label: 'Geöffnet', value: 'Apr. bis Okt.' }],
        highlights: ['Der Klimatograph — 10 interaktive Räume', '360° Panorama', 'Météo-France Station seit 1894', 'Workshops für Kinder', 'Themenkonferenzen', 'Warme Kleidung auch im Sommer mitbringen'],
        footer: 'Klimatograph: +33 4 67 42 59 83 — climatographe.fr', tags_labels: ['1.567 m', 'Wetter', '360° Panorama', 'Cevennen']
      },
      hotel_autrefois: {
        title: "Das Hotel in der Vergangenheit", badge: 'Seit 1892', desc: `Das Hotel de l'Europe ist eine Institution in Meyrueis. Es wurde Ende des 19. Jahrhunderts gegründet und wird seit über 130 Jahren von derselben Familie geführt.`,
        info: [{ label: 'Gegründet in', value: '1892' }, { label: 'Generationen', value: '5 Familien' }, { label: 'Zimmer', value: '29 Zimmer' }],
        highlights: ["Über 130 Jahre ununterbrochene familiäre Gastfreundschaft", "Der gleiche Geist des herzlichen Empfangs", "Zeuge der Geschichte von Meyrueis", "Renovierungen bewahren die Seele", "Privatparkplatz — eine Seltenheit", "Heute: Glasfaser-WLAN und moderner Komfort"],
        footer: "Die Geschichte geht weiter... Danke, dass Sie Teil unseres Familienabenteuers sind.", tags_labels: ['Geschichte', '5 Generationen', 'Erbe', 'Familie']
      }
    }
  }
};

for (const lang in additions) {
  translations[lang] = { ...translations[lang], ...additions[lang] };
}

const finalCode = 'const translations = ' + JSON.stringify(translations, null, 2) + ';\n';
fs.writeFileSync('translations.js', finalCode);
console.log("Translations updated!");
