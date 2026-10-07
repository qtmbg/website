// The Work archive: one canonical record per project. Written from the
// excavation registers in archive/registers/ (sources, claims, conflicts),
// which stay internal. Owner-attested facts are canonical; public sources
// corroborate; nothing is inferred. Relationships are precise, never
// "client" by default. Rendered by src/archive/render.mjs.

// Chapters of the career, in order. They overlap in time.
export const eras = [
  { key: 'early-creative-editorial', css: 'early', label: { en: 'Creative and editorial', fr: 'Création et éditorial' }, span: { en: 'From 2006', fr: 'Depuis 2006' } },
  { key: 'brand-digital-experience', css: 'brand', label: { en: 'Brand, digital and experience', fr: 'Marque, digital et expérience' } },
  { key: 'institutional-creative-industries', css: 'institutional', label: { en: 'Institutions and creative industries', fr: 'Institutions et industries créatives' } },
  { key: 'culture-media', css: 'culture', label: { en: 'Culture and media', fr: 'Culture et médias' } },
  { key: 'web3-emerging-tech', css: 'web3', label: { en: 'Web3 and emerging technology', fr: 'Web3 et technologies émergentes' } },
  { key: 'brand-ai-business', css: 'current', label: { en: 'Brand × AI × Business', fr: 'Marque × IA × Business' }, span: { en: 'Quantum Branding', fr: 'Quantum Branding' } }
];

export const categories = {
  brand: { en: 'Brand', fr: 'Marque' },
  culture: { en: 'Culture', fr: 'Culture' },
  institutional: { en: 'Institutional', fr: 'Institutionnel' },
  luxury: { en: 'Luxury', fr: 'Luxe' },
  technology: { en: 'Technology', fr: 'Technologie' },
  web3: { en: 'Web3', fr: 'Web3' },
  ai: { en: 'AI', fr: 'IA' },
  business: { en: 'Business', fr: 'Business' },
  experience: { en: 'Experience', fr: 'Expérience' },
  editorial: { en: 'Editorial', fr: 'Éditorial' },
  media: { en: 'Film and media', fr: 'Film et médias' },
  events: { en: 'Events and stages', fr: 'Événements et scènes' }
};

export const relationships = {
  'MEDIA APPEARANCE': { en: 'Media appearance', fr: 'Apparition médiatique' },
  'STUDIO RECORD': { en: 'Studio record', fr: 'Archives du studio' },
  CLIENT: { en: 'Client', fr: 'Client' },
  ENGAGEMENT: { en: 'Engagement', fr: 'Mission' },
  'FRACTIONAL CMO': { en: 'Fractional CMO', fr: 'Directeur marketing à temps partagé' },
  ADVISORY: { en: 'Advisory', fr: 'Conseil' },
  CONSULTING: { en: 'Consulting', fr: 'Conseil' },
  'STUDIO CLIENT': { en: 'Studio client', fr: 'Client du studio' },
  PARTNERSHIP: { en: 'Partnership', fr: 'Partenariat' },
  COLLABORATION: { en: 'Collaboration', fr: 'Collaboration' },
  'INSTITUTIONAL MANDATE': { en: 'Institutional mandate', fr: 'Mandat institutionnel' },
  EXPERT: { en: 'Expert', fr: 'Expert' },
  JUDGE: { en: 'Judge', fr: 'Membre du jury' },
  SPEAKER: { en: 'Speaker', fr: 'Intervenant' },
  FOUNDER: { en: 'Founder', fr: 'Fondateur' },
  'CO-FOUNDER': { en: 'Co-founder', fr: 'Cofondateur' },
  BOARD: { en: 'Board', fr: 'Conseil d’administration' },
  EDITORIAL: { en: 'Editorial', fr: 'Éditorial' },
  'INVITED GUEST': { en: 'Invited guest', fr: 'Invité' }
};

export const projects = [
  {
    "slug": "diptyk",
    "title": "DIPTYK",
    "aliases": [],
    "era": "culture-media",
    "categories": [
      "culture",
      "editorial",
      "brand",
      "media"
    ],
    "relationship": "STUDIO CLIENT",
    "role": {
      "en": "Brand Strategy & Implementation · Arroz Con Pollo co-founder",
      "fr": "Brand Strategy & Implementation · cofondateur d’Arroz Con Pollo"
    },
    "oneLine": {
      "en": "A magazine transformation spanning print, digital, editorial content and podcast production through Arroz Con Pollo.",
      "fr": "Une transformation du magazine couvrant le print, le numérique, les contenus éditoriaux et la production de podcasts au sein d’Arroz Con Pollo."
    },
    "summary": {
      "en": [
        "A magazine transformation spanning print, digital, editorial content and podcast production through Arroz Con Pollo."
      ],
      "fr": [
        "Une transformation du magazine couvrant le print, le numérique, les contenus éditoriaux et la production de podcasts au sein d’Arroz Con Pollo."
      ]
    },
    "start": 2019,
    "end": 2021,
    "context": {
      "en": "DIPTYK",
      "fr": "DIPTYK"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.arrozconpollo.studio/diptyk"
      },
      {
        "label": {
          "en": "The New York Times · 12 August 2020",
          "fr": "The New York Times · 12 août 2020"
        },
        "url": "https://www.nytimes.com/2020/08/12/arts/design/instagram-art-accounts-to-follow.html"
      }
    ],
    "related": [
      "audi-driven-by-art",
      "ocp",
      "arroz-con-pollo"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "A magazine transformation spanning print, digital, editorial content and podcast production through Arroz Con Pollo."
          ],
          "fr": [
            "Une transformation du magazine couvrant le print, le numérique, les contenus éditoriaux et la production de podcasts au sein d’Arroz Con Pollo."
          ]
        }
      },
      {
        "type": "text",
        "body": {
          "en": [
            "The studio’s October 2019 brief covered a complete digital and print overhaul. Zahra Sebti designed the magazine’s new print identity beginning with issue 52. During the pandemic, issue 53/4 was released online for free."
          ],
          "fr": [
            "Le brief du studio d’octobre 2019 couvrait une refonte complète du numérique et du print. Zahra Sebti a conçu la nouvelle identité imprimée à partir du numéro 52. Pendant la pandémie, le numéro 53/4 a été diffusé gratuitement en ligne."
          ]
        },
        "heading": {
          "en": "Print and digital transformation",
          "fr": "Transformation print et numérique"
        }
      },
      {
        "type": "text",
        "body": {
          "en": [
            "Arroz Con Pollo created, recorded, produced and distributed the podcast hosted by editor-in-chief Meryem Sebti. Remote production preserved audio quality during social distancing. Its identity and social content extended the magazine into an audio archive of Moroccan and African art."
          ],
          "fr": [
            "Arroz Con Pollo a créé, enregistré, produit et distribué le podcast animé par la rédactrice en chef Meryem Sebti. La production à distance a maintenu la qualité audio pendant la distanciation. Son identité et ses contenus sociaux ont prolongé le magazine en archives sonores de l’art marocain et africain."
          ]
        },
        "heading": {
          "en": "An audio archive of art",
          "fr": "Des archives sonores de l’art"
        }
      },
      {
        "type": "text",
        "body": {
          "en": [
            "On 12 August 2020, Diptyk’s Instagram account, @diptykmagazine, was included in Siddhartha Mitter’s “Five Art Accounts to Follow on Instagram Now” in The New York Times. The recognition concerned the magazine’s account and the editorial and digital work Arroz Con Pollo built for it."
          ],
          "fr": [
            "Le 12 août 2020, le compte Instagram de Diptyk, @diptykmagazine, a été retenu dans l’article de Siddhartha Mitter « Five Art Accounts to Follow on Instagram Now » du New York Times. Cette reconnaissance concernait le compte du magazine et le travail éditorial et numérique qu’Arroz Con Pollo avait construit pour lui."
          ]
        },
        "heading": {
          "en": "The New York Times",
          "fr": "The New York Times"
        }
      },
      {
        "type": "audio",
        "src": "https://anchor.fm/s/4cef4a88/podcast/play/42514900/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-9-29%2F4068f771-4628-6622-144e-57eb2398a4aa.mp3",
        "caption": {
          "en": "Ngoné Fall (épisode #10)",
          "fr": "Ngoné Fall (épisode #10)"
        }
      },
      {
        "type": "audio",
        "src": "https://anchor.fm/s/4cef4a88/podcast/play/37599300/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-6-21%2F7fad1894-dba3-47ed-0099-2422909a372f.mp3",
        "caption": {
          "en": "Younes Rahmoun (épisode #9)",
          "fr": "Younes Rahmoun (épisode #9)"
        }
      },
      {
        "type": "audio",
        "src": "https://anchor.fm/s/4cef4a88/podcast/play/36219903/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-5-26%2Fb6133324-f2e9-f7fa-2210-8bbfdef4b3de.mp3",
        "caption": {
          "en": "Nathalie Obadia de la Galerie Nathalie Obadia (épisode #8)",
          "fr": "Nathalie Obadia de la Galerie Nathalie Obadia (épisode #8)"
        }
      },
      {
        "type": "audio",
        "src": "https://anchor.fm/s/4cef4a88/podcast/play/35314857/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-5-11%2F5f10659a-e164-1178-e78e-0ea348878e9a.mp3",
        "caption": {
          "en": "Abdelkader Damani du Frac Centre-Val de Loire (épisode #7)",
          "fr": "Abdelkader Damani du Frac Centre-Val de Loire (épisode #7)"
        }
      },
      {
        "type": "audio",
        "src": "https://anchor.fm/s/4cef4a88/podcast/play/34277717/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-4-26%2F5dbcc4de-813e-6bef-7a3e-f99046f867cc.mp3",
        "caption": {
          "en": "Mouna Mekouar (épisode #6)",
          "fr": "Mouna Mekouar (épisode #6)"
        }
      },
      {
        "type": "audio",
        "src": "https://anchor.fm/s/4cef4a88/podcast/play/32778680/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-4-4%2Ffb6d67d1-f887-9305-2af9-1fdb6eae7ecc.mp3",
        "caption": {
          "en": "Touria El Glaoui de 1-54 Contemporary Art Fair (épisode #5)",
          "fr": "Touria El Glaoui de 1-54 Contemporary Art Fair (épisode #5)"
        }
      },
      {
        "type": "audio",
        "src": "https://anchor.fm/s/4cef4a88/podcast/play/31624342/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-3-17%2Faba63b97-6cdd-f1c4-746b-18ac873bc540.mp3",
        "caption": {
          "en": "Abdellah Karroum de L’appartement 22 (épisode #4)",
          "fr": "Abdellah Karroum de L’appartement 22 (épisode #4)"
        }
      },
      {
        "type": "audio",
        "src": "https://anchor.fm/s/4cef4a88/podcast/play/30038050/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-2-26%2F06169752-24af-2ddb-a87d-9672c6db9e54.mp3",
        "caption": {
          "en": "Michel Gauthier du Musée national d’art moderne (épisode #3)",
          "fr": "Michel Gauthier du Musée national d’art moderne (épisode #3)"
        }
      },
      {
        "type": "audio",
        "src": "https://anchor.fm/s/4cef4a88/podcast/play/28772242/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-2-12%2Fb22af60e-9d2a-85ed-cc66-048022ea2be4.mp3",
        "caption": {
          "en": "Meriem Berrada du Macaal (épisode #2)",
          "fr": "Meriem Berrada du Macaal (épisode #2)"
        }
      },
      {
        "type": "audio",
        "src": "https://anchor.fm/s/4cef4a88/podcast/play/26891298/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2021-1-18%2Ffc704b3e-849e-ef94-a127-195a5910f7a8.mp3",
        "caption": {
          "en": "Amadou Diaw du Mupho (épisode #1)",
          "fr": "Amadou Diaw du Mupho (épisode #1)"
        }
      },
      {
        "type": "film",
        "youtube": "2BtYNEst69I",
        "title": {
          "en": "Diptyk · Arroz Con Pollo studio film",
          "fr": "Diptyk · Arroz Con Pollo studio film"
        },
        "poster": "diptyk-film-2btynest69i"
      },
      {
        "type": "gallery",
        "media": [
          "diptyk-02",
          "diptyk-03",
          "diptyk-05",
          "diptyk-06",
          "diptyk-07",
          "diptyk-08",
          "diptyk-11",
          "diptyk-12",
          "diptyk-13",
          "diptyk-14"
        ],
        "layout": "grid",
        "title": {
          "en": "From the archive",
          "fr": "Dans les archives"
        }
      }
    ],
    "credits": [
      {
        "name": "Nizzar Ben Chekroune",
        "role": {
          "en": "Strategy, marketing and digital content · studio co-founder",
          "fr": "Stratégie, marketing et contenus numériques · cofondateur du studio"
        }
      },
      {
        "name": "Nabil Nadifi",
        "role": {
          "en": "Project lead; podcast production",
          "fr": "Direction du projet ; production du podcast"
        }
      },
      {
        "name": "Zahra Sebti",
        "role": {
          "en": "Print graphic design",
          "fr": "Design graphique imprimé"
        }
      },
      {
        "name": "Simo Bakrim",
        "role": {
          "en": "Podcast editing",
          "fr": "Montage du podcast"
        }
      },
      {
        "name": "Meryem Sebti",
        "role": {
          "en": "Editor-in-chief and podcast host",
          "fr": "Rédactrice en chef et animatrice du podcast"
        }
      }
    ],
    "studio": "arroz-con-pollo",
    "flagship": true,
    "cover": "diptyk-01",
    "gallery": [
      "diptyk-02",
      "diptyk-03",
      "diptyk-05",
      "diptyk-06",
      "diptyk-07",
      "diptyk-08",
      "diptyk-11",
      "diptyk-12",
      "diptyk-13",
      "diptyk-14"
    ]
  },
  {
    "slug": "la-minute-creative",
    "title": "La Minute Créative",
    "aliases": [],
    "era": "institutional-creative-industries",
    "categories": [
      "institutional",
      "culture",
      "media",
      "brand"
    ],
    "relationship": "INSTITUTIONAL MANDATE",
    "role": {
      "en": "Cluster development, visibility strategy and storytelling",
      "fr": "Développement de clusters, stratégie de visibilité et narration"
    },
    "oneLine": {
      "en": "Films making the people and skills of creative industries visible within UNIDO’s Creative Mediterranean programme.",
      "fr": "Des films qui rendent visibles les personnes et les savoir-faire des industries créatives dans le programme Creative Mediterranean de l’ONUDI."
    },
    "summary": {
      "en": [
        "Films making the people and skills of creative industries visible within UNIDO’s Creative Mediterranean programme."
      ],
      "fr": [
        "Des films qui rendent visibles les personnes et les savoir-faire des industries créatives dans le programme Creative Mediterranean de l’ONUDI."
      ]
    },
    "start": 2015,
    "end": 2019,
    "context": {
      "en": "La Minute Créative",
      "fr": "La Minute Créative"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.unido.org/stories/creative-mediterranean-resilience-built-through-creativity"
      }
    ],
    "related": [
      "unido-creative-mediterranean",
      "marrakech-creative-interiors-cluster",
      "creative-forum-ljubljana-2018"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Films making the people and skills of creative industries visible within UNIDO’s Creative Mediterranean programme."
          ],
          "fr": [
            "Des films qui rendent visibles les personnes et les savoir-faire des industries créatives dans le programme Creative Mediterranean de l’ONUDI."
          ]
        }
      },
      {
        "type": "text",
        "body": {
          "en": [
            "The format used short films to introduce artisans, their work and the creative ecosystem. Film, storytelling, social distribution and institutional presentations made the programme accessible beyond the cluster itself."
          ],
          "fr": [
            "Le format utilisait des films courts pour présenter les artisans, leur travail et l’écosystème créatif. Film, narration, diffusion sociale et présentations institutionnelles ont rendu le programme accessible au-delà du cluster."
          ]
        }
      },
      {
        "type": "text",
        "body": {
          "en": [
            "The programme reached 2M+ views and was used as a case study across six countries."
          ],
          "fr": [
            "Le programme a atteint plus de 2 millions de vues et a été utilisé comme étude de cas dans six pays."
          ]
        }
      },
      {
        "title": {
          "en": "La Minute Créative #0 * Trailer Saison 1",
          "fr": "La Minute Créative #0 * Trailer Saison 1"
        },
        "youtube": "4_ql8Vtuhvc",
        "poster": "la-minute-creative-02",
        "type": "film"
      },
      {
        "title": {
          "en": "La Minute Créative #17 * Saïda Kadiri",
          "fr": "La Minute Créative #17 * Saïda Kadiri"
        },
        "youtube": "NBntNkqnzhs",
        "poster": "la-minute-creative-03",
        "type": "film"
      },
      {
        "title": {
          "en": "La Minute Créative #1 * Miloud El Jouli",
          "fr": "La Minute Créative #1 * Miloud El Jouli"
        },
        "youtube": "XJkNH08tws4",
        "poster": "la-minute-creative-04",
        "type": "film"
      },
      {
        "title": {
          "en": "ChabiChic La minute créative saison 2",
          "fr": "ChabiChic La minute créative saison 2"
        },
        "youtube": "e3eXl0CmkAM",
        "poster": "la-minute-creative-05",
        "type": "film"
      },
      {
        "title": {
          "en": "La Minute Créative #12 * Mehdi Tajmouati",
          "fr": "La Minute Créative #12 * Mehdi Tajmouati"
        },
        "youtube": "ro_fBU_U6rA",
        "poster": "la-minute-creative-06",
        "type": "film"
      },
      {
        "type": "gallery",
        "media": [
          "la-minute-creative-03",
          "la-minute-creative-04",
          "la-minute-creative-05",
          "la-minute-creative-06"
        ],
        "layout": "grid",
        "title": {
          "en": "From the archive",
          "fr": "Dans les archives"
        }
      }
    ],
    "credits": [],
    "flagship": true,
    "cover": "la-minute-creative-02",
    "gallery": [
      "la-minute-creative-03",
      "la-minute-creative-04",
      "la-minute-creative-05",
      "la-minute-creative-06"
    ]
  },
  {
    "slug": "diesel",
    "title": "DIESEL",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "media"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "Strategy and marketing for Diesel",
      "fr": "Stratégie et marketing pour Diesel"
    },
    "oneLine": {
      "en": "Strategy and marketing for the Diesel brand, with historical digital and social work retained in the archive.",
      "fr": "Stratégie et marketing pour la marque Diesel, avec des travaux historiques numériques et sociaux conservés dans les archives."
    },
    "summary": {
      "en": [
        "Strategy and marketing for the Diesel brand, with historical digital and social work retained in the archive."
      ],
      "fr": [
        "Stratégie et marketing pour la marque Diesel, avec des travaux historiques numériques et sociaux conservés dans les archives."
      ]
    },
    "start": 2018,
    "end": 2020,
    "context": {
      "en": "DIESEL",
      "fr": "DIESEL"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.fiverr.com/nizzar"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Strategy and marketing for the Diesel brand, with historical digital and social work retained in the archive."
          ],
          "fr": [
            "Stratégie et marketing pour la marque Diesel, avec des travaux historiques numériques et sociaux conservés dans les archives."
          ]
        }
      }
    ],
    "credits": [],
    "flagship": true,
    "cover": "diesel-01",
    "gallery": []
  },
  {
    "slug": "audi-driven-by-art",
    "title": "AUDI × DIPTYK · Driven by Art",
    "aliases": [],
    "era": "culture-media",
    "categories": [
      "culture",
      "luxury",
      "media",
      "events"
    ],
    "relationship": "STUDIO CLIENT",
    "role": {
      "en": "Brand programming, content and live campaign",
      "fr": "Programmation de marque, contenus et campagne événementielle"
    },
    "oneLine": {
      "en": "Brand programming and a 360° content campaign for Audi and Diptyk at the 1:54 Contemporary African Art Fair, through Arroz Con Pollo.",
      "fr": "Programmation de marque et campagne de contenus à 360° pour Audi et Diptyk à la foire d’art contemporain africain 1:54, avec Arroz Con Pollo."
    },
    "summary": {
      "en": [
        "Brand programming and a 360° content campaign for Audi and Diptyk at the 1:54 Contemporary African Art Fair, through Arroz Con Pollo."
      ],
      "fr": [
        "Programmation de marque et campagne de contenus à 360° pour Audi et Diptyk à la foire d’art contemporain africain 1:54, avec Arroz Con Pollo."
      ]
    },
    "start": 2020,
    "end": 2020,
    "context": {
      "en": "AUDI × DIPTYK · Driven by Art",
      "fr": "AUDI × DIPTYK · Driven by Art"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.youtube.com/playlist?list=PLElDw5sbIdN34EDb4hwJTzzgHhvn1d-2M"
      }
    ],
    "related": [
      "diptyk",
      "ocp",
      "arroz-con-pollo"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Brand programming and a 360° content campaign for Audi and Diptyk at the 1:54 Contemporary African Art Fair, through Arroz Con Pollo."
          ],
          "fr": [
            "Programmation de marque et campagne de contenus à 360° pour Audi et Diptyk à la foire d’art contemporain africain 1:54, avec Arroz Con Pollo."
          ]
        }
      },
      {
        "title": {
          "en": "Audi Motors · public portfolio evidence",
          "fr": "Audi Motors · public portfolio evidence"
        },
        "url": "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/spr3xadmej335dvab3wr.mp4",
        "media": "audi-driven-by-art-film",
        "poster": "audi-driven-by-art-06",
        "type": "film"
      },
      {
        "type": "gallery",
        "media": [
          "audi-driven-by-art-02",
          "audi-driven-by-art-03",
          "audi-driven-by-art-04",
          "audi-driven-by-art-06"
        ],
        "layout": "grid",
        "title": {
          "en": "From the archive",
          "fr": "Dans les archives"
        }
      }
    ],
    "credits": [
      {
        "name": "Arroz Con Pollo",
        "role": {
          "en": "Creative studio and production team",
          "fr": "Studio créatif et équipe de production"
        }
      }
    ],
    "studio": "arroz-con-pollo",
    "flagship": true,
    "cover": "audi-driven-by-art-01",
    "gallery": [
      "audi-driven-by-art-02",
      "audi-driven-by-art-03",
      "audi-driven-by-art-04",
      "audi-driven-by-art-06"
    ]
  },
  {
    "slug": "verne-jewels",
    "title": "VERNE JEWELS",
    "aliases": [],
    "era": "brand-ai-business",
    "categories": [
      "brand",
      "luxury",
      "business",
      "experience"
    ],
    "relationship": "FRACTIONAL CMO",
    "role": {
      "en": "Fractional CMO · April 2025–August 2026, completed",
      "fr": "Directeur marketing à temps partagé · avril 2025–août 2026, mission achevée"
    },
    "oneLine": {
      "en": "A completed fractional CMO engagement shaping the luxury jewellery house’s strategic direction, including handover.",
      "fr": "Une mission achevée de direction marketing à temps partagé pour orienter la maison de joaillerie, transmission comprise."
    },
    "summary": {
      "en": [
        "A completed fractional CMO engagement shaping the luxury jewellery house’s strategic direction, including handover."
      ],
      "fr": [
        "Une mission achevée de direction marketing à temps partagé pour orienter la maison de joaillerie, transmission comprise."
      ]
    },
    "start": 2025,
    "end": 2026,
    "context": {
      "en": "VERNE JEWELS",
      "fr": "VERNE JEWELS"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://thequantumbranding.com/work/verne-jewels"
      }
    ],
    "related": [
      "quantum-branding",
      "brandos",
      "selvaggi",
      "africa-business-school"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "A completed fractional CMO engagement shaping the luxury jewellery house’s strategic direction, including handover."
          ],
          "fr": [
            "Une mission achevée de direction marketing à temps partagé pour orienter la maison de joaillerie, transmission comprise."
          ]
        }
      }
    ],
    "credits": [],
    "flagship": true,
    "cover": "verne-jewels-local-verne29",
    "gallery": []
  },
  {
    "slug": "selvaggi",
    "title": "SELVAGGI BUILT",
    "aliases": [],
    "era": "brand-ai-business",
    "categories": [
      "brand",
      "business",
      "ai",
      "technology",
      "experience"
    ],
    "relationship": "CLIENT",
    "role": {
      "en": "Brand strategy, digital systems and implementation",
      "fr": "Stratégie de marque, systèmes numériques et mise en œuvre"
    },
    "oneLine": {
      "en": "Turning the reality of occupied hospital renovation into a clear positioning and an operating brand system.",
      "fr": "Transformer la réalité des rénovations hospitalières en site occupé en un positionnement clair et un système de marque opérationnel."
    },
    "summary": {
      "en": [
        "Turning the reality of occupied hospital renovation into a clear positioning and an operating brand system."
      ],
      "fr": [
        "Transformer la réalité des rénovations hospitalières en site occupé en un positionnement clair et un système de marque opérationnel."
      ]
    },
    "start": 2025,
    "end": "present",
    "context": {
      "en": "SELVAGGI BUILT",
      "fr": "SELVAGGI BUILT"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://thequantumbranding.com/work/selvaggi"
      }
    ],
    "related": [
      "quantum-branding",
      "brandos",
      "verne-jewels",
      "africa-business-school"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Turning the reality of occupied hospital renovation into a clear positioning and an operating brand system."
          ],
          "fr": [
            "Transformer la réalité des rénovations hospitalières en site occupé en un positionnement clair et un système de marque opérationnel."
          ]
        }
      },
      {
        "type": "gallery",
        "media": [
          "selvaggi-local-j"
        ],
        "layout": "grid",
        "title": {
          "en": "From the archive",
          "fr": "Dans les archives"
        }
      }
    ],
    "credits": [],
    "flagship": true,
    "cover": "selvaggi-local-h",
    "gallery": [
      "selvaggi-local-j"
    ]
  },
  {
    "slug": "africa-business-school",
    "title": "AFRICA BUSINESS SCHOOL / UM6P",
    "aliases": [],
    "era": "brand-ai-business",
    "categories": [
      "brand",
      "ai",
      "business",
      "institutional"
    ],
    "relationship": "EXPERT",
    "role": {
      "en": "External expert · marketing strategy, emerging technologies and internal workshops",
      "fr": "Expert externe · stratégie marketing, technologies émergentes et ateliers internes"
    },
    "oneLine": {
      "en": "A February–May 2025 engagement combining marketing strategy, brand and content, practical AI applications and support toward an action plan.",
      "fr": "Une mission de février à mai 2025 réunissant stratégie marketing, marque et contenus, applications concrètes de l’IA et appui à un plan d’action."
    },
    "summary": {
      "en": [
        "A February–May 2025 engagement combining marketing strategy, brand and content, practical AI applications and support toward an action plan."
      ],
      "fr": [
        "Une mission de février à mai 2025 réunissant stratégie marketing, marque et contenus, applications concrètes de l’IA et appui à un plan d’action."
      ]
    },
    "start": 2025,
    "end": 2025,
    "context": {
      "en": "AFRICA BUSINESS SCHOOL / UM6P",
      "fr": "AFRICA BUSINESS SCHOOL / UM6P"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://sessionize.com/nizzar/"
      }
    ],
    "related": [
      "quantum-branding",
      "brandos",
      "verne-jewels",
      "selvaggi"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "A February–May 2025 engagement combining marketing strategy, brand and content, practical AI applications and support toward an action plan."
          ],
          "fr": [
            "Une mission de février à mai 2025 réunissant stratégie marketing, marque et contenus, applications concrètes de l’IA et appui à un plan d’action."
          ]
        }
      },
      {
        "type": "text",
        "body": {
          "en": [
            "ABS sought to rethink marketing amid rapid change in content, promotion, branding and emerging technologies. The scope covered Marketing & Sales, Multimedia Services, Admissions and Business Development. Workshops and supporting materials fed work toward a Marketing, Communication and Sales action plan."
          ],
          "fr": [
            "ABS souhaitait repenser le marketing face aux évolutions des contenus, de la promotion, de la marque et des technologies émergentes. Le périmètre couvrait Marketing & Sales, les services multimédias, les admissions et le Business Development. Ateliers et supports alimentaient un plan d’action Marketing, Communication et Sales."
          ]
        }
      },
      {
        "type": "text",
        "body": {
          "en": [
            "“Regarder le Futur droit dans les yeux” was the workshop title used at the time. The three recordings show one part of a broader strategic engagement. Practical AI topics included prioritisation, team assistants, campaign analysis, reporting, listening and content production."
          ],
          "fr": [
            "« Regarder le Futur droit dans les yeux » était le titre de l’atelier utilisé à l’époque. Les trois enregistrements montrent une partie d’une mission stratégique plus large. Les sujets IA incluaient priorisation, assistants d’équipe, analyse de campagnes, reporting, veille et production de contenus."
          ]
        }
      },
      {
        "type": "film",
        "youtube": "3DQ-tTENOUw",
        "title": {
          "en": "Regarder le Futur droit dans les yeux · Part 1",
          "fr": "Regarder le Futur droit dans les yeux · Part 1"
        },
        "poster": "africa-business-school-film-3dq-ttenouw"
      },
      {
        "type": "film",
        "youtube": "U-bGD9hA1JQ",
        "title": {
          "en": "Regarder le Futur droit dans les yeux · Part 2",
          "fr": "Regarder le Futur droit dans les yeux · Part 2"
        },
        "poster": "africa-business-school-film-u-bgd9ha1jq"
      },
      {
        "type": "film",
        "youtube": "ilQVkOl8OkA",
        "title": {
          "en": "Regarder le Futur droit dans les yeux · Part 3",
          "fr": "Regarder le Futur droit dans les yeux · Part 3"
        },
        "poster": "africa-business-school-film-ilqvkol8oka"
      }
    ],
    "credits": [],
    "flagship": true,
    "home": true,
    "cover": "africa-business-school-film-3dq-ttenouw",
    "gallery": []
  },
  {
    "slug": "energy-cube",
    "title": "ENERGY CUBE / VETREN ENERGY",
    "aliases": [],
    "era": "brand-ai-business",
    "categories": [
      "brand",
      "technology",
      "business"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "Energy Cube / Vetren Energy engagement",
      "fr": "Mission Energy Cube / Vetren Energy"
    },
    "oneLine": {
      "en": "Energy Cube / Vetren Energy, part of my professional work.",
      "fr": "Energy Cube / Vetren Energy, une mission de mon parcours professionnel."
    },
    "summary": {
      "en": [
        "Energy Cube / Vetren Energy, part of my professional work."
      ],
      "fr": [
        "Energy Cube / Vetren Energy, une mission de mon parcours professionnel."
      ]
    },
    "start": 2024,
    "end": 2024,
    "context": {
      "en": "ENERGY CUBE / VETREN ENERGY",
      "fr": "ENERGY CUBE / VETREN ENERGY"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://thequantumbranding.com/work"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Energy Cube / Vetren Energy, part of my professional work."
          ],
          "fr": [
            "Energy Cube / Vetren Energy, une mission de mon parcours professionnel."
          ]
        }
      }
    ],
    "credits": [],
    "flagship": false,
    "cover": null,
    "gallery": []
  },
  {
    "slug": "zone-aire",
    "title": "ZONE AIRE",
    "aliases": [],
    "era": "brand-ai-business",
    "categories": [
      "brand",
      "business"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "Professional engagement",
      "fr": "Mission professionnelle"
    },
    "oneLine": {
      "en": "Zone Aire, part of my professional work.",
      "fr": "Zone Aire, une mission de mon parcours professionnel."
    },
    "summary": {
      "en": [
        "Zone Aire, part of my professional work."
      ],
      "fr": [
        "Zone Aire, une mission de mon parcours professionnel."
      ]
    },
    "start": 2026,
    "end": 2026,
    "context": {
      "en": "ZONE AIRE",
      "fr": "ZONE AIRE"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://thequantumbranding.com/work"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Zone Aire, part of my professional work."
          ],
          "fr": [
            "Zone Aire, une mission de mon parcours professionnel."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "stan-wawrinka",
    "title": "STAN WAWRINKA / BALLMAN",
    "aliases": [],
    "era": "web3-emerging-tech",
    "categories": [
      "web3",
      "brand",
      "business"
    ],
    "relationship": "ADVISORY",
    "role": {
      "en": "Strategic advisor · July 2021–July 2024",
      "fr": "Conseiller stratégique · juillet 2021–juillet 2024"
    },
    "oneLine": {
      "en": "Strategic advisory connecting Stan Wawrinka’s career and community to Web3, including the Ballman context.",
      "fr": "Conseil stratégique reliant le parcours et la communauté de Stan Wawrinka au Web3, notamment dans le contexte Ballman."
    },
    "summary": {
      "en": [
        "Strategic advisory connecting Stan Wawrinka’s career and community to Web3, including the Ballman context."
      ],
      "fr": [
        "Conseil stratégique reliant le parcours et la communauté de Stan Wawrinka au Web3, notamment dans le contexte Ballman."
      ]
    },
    "start": 2021,
    "end": 2024,
    "context": {
      "en": "STAN WAWRINKA / BALLMAN",
      "fr": "STAN WAWRINKA / BALLMAN"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [
      "french-tennis-federation",
      "kareem-abdul-jabbar"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Strategic advisory connecting Stan Wawrinka’s career and community to Web3, including the Ballman context."
          ],
          "fr": [
            "Conseil stratégique reliant le parcours et la communauté de Stan Wawrinka au Web3, notamment dans le contexte Ballman."
          ]
        }
      }
    ],
    "credits": [],
    "flagship": true,
    "cover": "stan-wawrinka-01",
    "gallery": []
  },
  {
    "slug": "baccarat",
    "title": "BACCARAT",
    "aliases": [],
    "era": "web3-emerging-tech",
    "categories": [
      "web3",
      "luxury",
      "brand"
    ],
    "relationship": "ADVISORY",
    "role": {
      "en": "Web3 strategy through Berexia · February–June 2023",
      "fr": "Stratégie Web3 via Berexia · février–juin 2023"
    },
    "oneLine": {
      "en": "Research and strategic advisory on digital experiences, community and Web3 for Baccarat.",
      "fr": "Recherche et conseil stratégique sur les expériences numériques, la communauté et le Web3 pour Baccarat."
    },
    "summary": {
      "en": [
        "Research and strategic advisory on digital experiences, community and Web3 for Baccarat."
      ],
      "fr": [
        "Recherche et conseil stratégique sur les expériences numériques, la communauté et le Web3 pour Baccarat."
      ]
    },
    "start": 2023,
    "end": 2023,
    "context": {
      "en": "BACCARAT",
      "fr": "BACCARAT"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Research and strategic advisory on digital experiences, community and Web3 for Baccarat."
          ],
          "fr": [
            "Recherche et conseil stratégique sur les expériences numériques, la communauté et le Web3 pour Baccarat."
          ]
        }
      },
      {
        "type": "text",
        "body": {
          "en": [
            "The research examined how a digital-world experience and new participation rules could create an engaged community and dynamic customer knowledge."
          ],
          "fr": [
            "La recherche examinait comment une expérience de monde numérique et de nouvelles règles de participation pouvaient créer une communauté engagée et une connaissance client dynamique."
          ]
        }
      }
    ],
    "credits": [],
    "cover": "baccarat-01",
    "gallery": []
  },
  {
    "slug": "bugatti-asprey-nft",
    "title": "BUGATTI × ASPREY",
    "aliases": [],
    "era": "web3-emerging-tech",
    "categories": [
      "web3",
      "luxury",
      "brand"
    ],
    "relationship": "ADVISORY",
    "role": {
      "en": "Web3 advisory",
      "fr": "Conseil Web3"
    },
    "oneLine": {
      "en": "A Web3 engagement in the Bugatti × Asprey context, documented in the historical portfolio.",
      "fr": "Une mission Web3 dans le contexte Bugatti × Asprey, documentée dans son portfolio historique."
    },
    "summary": {
      "en": [
        "A Web3 engagement in the Bugatti × Asprey context, documented in the historical portfolio."
      ],
      "fr": [
        "Une mission Web3 dans le contexte Bugatti × Asprey, documentée dans son portfolio historique."
      ]
    },
    "start": 2022,
    "end": null,
    "context": {
      "en": "BUGATTI × ASPREY",
      "fr": "BUGATTI × ASPREY"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.fiverr.com/nizzar"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "A Web3 engagement in the Bugatti × Asprey context, documented in the historical portfolio."
          ],
          "fr": [
            "Une mission Web3 dans le contexte Bugatti × Asprey, documentée dans son portfolio historique."
          ]
        }
      }
    ],
    "credits": [],
    "cover": "bugatti-asprey-nft-01",
    "gallery": []
  },
  {
    "slug": "kareem-abdul-jabbar",
    "title": "KAREEM ABDUL-JABBAR",
    "aliases": [],
    "era": "web3-emerging-tech",
    "categories": [
      "web3",
      "brand",
      "culture"
    ],
    "relationship": "ADVISORY",
    "role": {
      "en": "Strategic advisor · November 2022–March 2023",
      "fr": "Conseiller stratégique · novembre 2022–mars 2023"
    },
    "oneLine": {
      "en": "Strategic advisory on an NFT initiative connected to Kareem Abdul-Jabbar’s sporting and cultural legacy.",
      "fr": "Conseil stratégique sur une initiative NFT liée à l’héritage sportif et culturel de Kareem Abdul-Jabbar."
    },
    "summary": {
      "en": [
        "Strategic advisory on an NFT initiative connected to Kareem Abdul-Jabbar’s sporting and cultural legacy."
      ],
      "fr": [
        "Conseil stratégique sur une initiative NFT liée à l’héritage sportif et culturel de Kareem Abdul-Jabbar."
      ]
    },
    "start": 2022,
    "end": 2023,
    "context": {
      "en": "KAREEM ABDUL-JABBAR",
      "fr": "KAREEM ABDUL-JABBAR"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [
      "stan-wawrinka",
      "french-tennis-federation"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Strategic advisory on an NFT initiative connected to Kareem Abdul-Jabbar’s sporting and cultural legacy."
          ],
          "fr": [
            "Conseil stratégique sur une initiative NFT liée à l’héritage sportif et culturel de Kareem Abdul-Jabbar."
          ]
        }
      },
      {
        "type": "text",
        "body": {
          "en": [
            "Working with manager Deborah Morales, Nizzar questioned an NFT launch model ahead of LeBron James breaking the all-time scoring record. The advisory centred on value for fans and respect for Kareem’s legacy."
          ],
          "fr": [
            "Avec la manager Deborah Morales, Nizzar a interrogé un modèle de lancement NFT avant que LeBron James ne batte le record de points. Le conseil portait sur la valeur pour les fans et le respect de l’héritage de Kareem."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "french-tennis-federation",
    "title": "FRENCH TENNIS FEDERATION",
    "aliases": [],
    "era": "web3-emerging-tech",
    "categories": [
      "web3",
      "brand"
    ],
    "relationship": "CONSULTING",
    "role": {
      "en": "Web3 strategy, through Berexia",
      "fr": "Stratégie Web3, via Berexia"
    },
    "oneLine": {
      "en": "Rethinking the federation’s NFT model in light of lessons from Stan Wawrinka and Ballman.",
      "fr": "Repenser le modèle NFT de la fédération à partir des enseignements de Stan Wawrinka et Ballman."
    },
    "summary": {
      "en": [
        "A French Tennis Federation engagement preserved through Nizzar’s historical portfolio evidence."
      ],
      "fr": [
        "Une mission pour la Fédération française de tennis conservée grâce aux éléments du portfolio historique de Nizzar."
      ]
    },
    "start": 2023,
    "end": 2023,
    "context": {
      "en": "FRENCH TENNIS FEDERATION",
      "fr": "FRENCH TENNIS FEDERATION"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.fiverr.com/nizzar"
      }
    ],
    "related": [
      "stan-wawrinka",
      "kareem-abdul-jabbar"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Nizzar challenged the proposed model and broadened the federation’s understanding of Web3, drawing on his earlier advisory work with Stan Wawrinka. He consulted on Ballman; he did not build its original model."
          ],
          "fr": [
            "Nizzar a interrogé le modèle proposé et élargi la compréhension du Web3 de la fédération, en s’appuyant sur son conseil antérieur auprès de Stan Wawrinka. Il a conseillé Ballman ; il n’a pas construit son modèle initial."
          ]
        }
      }
    ],
    "credits": [],
    "cover": "french-tennis-federation-01",
    "gallery": []
  },
  {
    "slug": "la-lakers",
    "title": "LOS ANGELES LAKERS",
    "aliases": [],
    "era": "web3-emerging-tech",
    "categories": [
      "web3",
      "culture",
      "events"
    ],
    "relationship": "INVITED GUEST",
    "role": {
      "en": "Invited digital-art and Web3 expert · 2022–2024",
      "fr": "Expert en art numérique et Web3 invité · 2022–2024"
    },
    "oneLine": {
      "en": "Invited for three consecutive years to a private art event at the Los Angeles Lakers’ UCLA facility as a digital-art and Web3 expert.",
      "fr": "Invité trois années de suite à un événement artistique privé dans les installations UCLA des Los Angeles Lakers comme expert en art numérique et Web3."
    },
    "summary": {
      "en": [
        "Invited for three consecutive years to a private art event at the Los Angeles Lakers’ UCLA facility as a digital-art and Web3 expert."
      ],
      "fr": [
        "Invité trois années de suite à un événement artistique privé dans les installations UCLA des Los Angeles Lakers comme expert en art numérique et Web3."
      ]
    },
    "start": 2022,
    "end": 2024,
    "context": {
      "en": "LOS ANGELES LAKERS",
      "fr": "LOS ANGELES LAKERS"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Invited for three consecutive years to a private art event at the Los Angeles Lakers’ UCLA facility as a digital-art and Web3 expert."
          ],
          "fr": [
            "Invité trois années de suite à un événement artistique privé dans les installations UCLA des Los Angeles Lakers comme expert en art numérique et Web3."
          ]
        }
      }
    ],
    "credits": [],
    "cover": "la-lakers-01",
    "gallery": []
  },
  {
    "slug": "unlimitart",
    "title": "UNLIMITART",
    "aliases": [],
    "era": "web3-emerging-tech",
    "categories": [
      "web3",
      "business",
      "culture"
    ],
    "relationship": "FOUNDER",
    "role": {
      "en": "Founder",
      "fr": "Fondateur"
    },
    "oneLine": {
      "en": "Founded in 2021. $2.7M raised.",
      "fr": "Fondé en 2021. 2,7 millions de dollars levés."
    },
    "summary": {
      "en": [
        "Founded in 2021. $2.7M raised."
      ],
      "fr": [
        "Fondé en 2021. 2,7 millions de dollars levés."
      ]
    },
    "start": 2021,
    "end": 2023,
    "context": {
      "en": "UNLIMITART",
      "fr": "UNLIMITART"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://3kool.io/"
      }
    ],
    "related": [
      "nception",
      "bananacorp",
      "bananaconf",
      "the-future-fashion"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Founded in 2021. $2.7M raised."
          ],
          "fr": [
            "Fondé en 2021. 2,7 millions de dollars levés."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "nception",
    "title": "NCEPTION",
    "aliases": [
      "Nception",
      "Inception"
    ],
    "era": "web3-emerging-tech",
    "categories": [
      "web3",
      "business",
      "brand"
    ],
    "relationship": "CO-FOUNDER",
    "role": {
      "en": "Co-founder · June 2021–October 2023",
      "fr": "Cofondateur · juin 2021–octobre 2023"
    },
    "oneLine": {
      "en": "A Web3 venture connecting brand strategy, NFTs and emerging digital communities. Historical spelling: Inception.",
      "fr": "Un projet Web3 reliant stratégie de marque, NFT et communautés numériques émergentes. Ancienne graphie : Inception."
    },
    "summary": {
      "en": [
        "A Web3 venture connecting brand strategy, NFTs and emerging digital communities. Historical spelling: Inception."
      ],
      "fr": [
        "Un projet Web3 reliant stratégie de marque, NFT et communautés numériques émergentes. Ancienne graphie : Inception."
      ]
    },
    "start": 2021,
    "end": 2023,
    "context": {
      "en": "NCEPTION",
      "fr": "NCEPTION"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://nftlondon.sessionize.com/speakers"
      }
    ],
    "related": [
      "unlimitart",
      "bananacorp",
      "bananaconf",
      "the-future-fashion"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "A Web3 venture connecting brand strategy, NFTs and emerging digital communities. Historical spelling: Inception."
          ],
          "fr": [
            "Un projet Web3 reliant stratégie de marque, NFT et communautés numériques émergentes. Ancienne graphie : Inception."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "bananacorp",
    "title": "BANANACORP",
    "aliases": [
      "BnanaCorp",
      "BananaCorp"
    ],
    "era": "web3-emerging-tech",
    "categories": [
      "web3",
      "business",
      "events"
    ],
    "relationship": "CO-FOUNDER",
    "role": {
      "en": "Co-founder; board member; head of communications",
      "fr": "Cofondateur ; membre du conseil ; responsable de la communication"
    },
    "oneLine": {
      "en": "A collaborative Web3 venture and community behind technology, culture and event programmes. Historical spelling: BnanaCorp.",
      "fr": "Un projet collectif Web3 et une communauté à l’origine de programmes réunissant technologies, culture et événements. Ancienne graphie : BnanaCorp."
    },
    "summary": {
      "en": [
        "A collaborative Web3 venture and community behind technology, culture and event programmes. Historical spelling: BnanaCorp."
      ],
      "fr": [
        "Un projet collectif Web3 et une communauté à l’origine de programmes réunissant technologies, culture et événements. Ancienne graphie : BnanaCorp."
      ]
    },
    "start": 2022,
    "end": 2025,
    "context": {
      "en": "BANANACORP",
      "fr": "BANANACORP"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://3kool.io/"
      }
    ],
    "related": [
      "unlimitart",
      "nception",
      "bananaconf",
      "the-future-fashion"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "A collaborative Web3 venture and community behind technology, culture and event programmes. Historical spelling: BnanaCorp."
          ],
          "fr": [
            "Un projet collectif Web3 et une communauté à l’origine de programmes réunissant technologies, culture et événements. Ancienne graphie : BnanaCorp."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "bananaconf",
    "title": "BANANACONF",
    "aliases": [],
    "era": "web3-emerging-tech",
    "categories": [
      "web3",
      "technology",
      "events",
      "culture"
    ],
    "relationship": "CO-FOUNDER",
    "role": {
      "en": "Co-founder and co-organizer · May 2022–March 2025",
      "fr": "Cofondateur et coorganisateur · mai 2022–mars 2025"
    },
    "oneLine": {
      "en": "A Tallinn gathering connecting emerging technology, culture and communities, built with the BananaConf team.",
      "fr": "Un rendez-vous à Tallinn reliant technologies émergentes, culture et communautés, construit avec l’équipe BananaConf."
    },
    "summary": {
      "en": [
        "A Tallinn gathering connecting emerging technology, culture and communities, built with the BananaConf team."
      ],
      "fr": [
        "Un rendez-vous à Tallinn reliant technologies émergentes, culture et communautés, construit avec l’équipe BananaConf."
      ]
    },
    "start": 2022,
    "end": 2025,
    "context": {
      "en": "BANANACONF",
      "fr": "BANANACONF"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.nonfungibleconference.com/line-up?4261292b_page=2"
      }
    ],
    "related": [
      "unlimitart",
      "nception",
      "bananacorp",
      "the-future-fashion"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "A Tallinn gathering connecting emerging technology, culture and communities, built with the BananaConf team."
          ],
          "fr": [
            "Un rendez-vous à Tallinn reliant technologies émergentes, culture et communautés, construit avec l’équipe BananaConf."
          ]
        }
      },
      {
        "type": "film",
        "youtube": "6w-xN6veqYA",
        "title": {
          "en": "Dynamic NFTs, Loyalty and Rewards · 2024",
          "fr": "Dynamic NFTs, Loyalty and Rewards · 2024"
        },
        "poster": "bananaconf-film-6w-xn6veqya"
      },
      {
        "type": "film",
        "youtube": "GgZxjP3kSnI",
        "title": {
          "en": "Music NFTs and community · 2024",
          "fr": "Music NFTs and community · 2024"
        },
        "poster": "bananaconf-film-ggzxjp3ksni"
      }
    ],
    "credits": [],
    "flagship": true,
    "home": true,
    "cover": "bananaconf-film-6w-xn6veqya",
    "gallery": []
  },
  {
    "slug": "the-future-fashion",
    "title": "THE FUTURE FASHION",
    "aliases": [],
    "era": "web3-emerging-tech",
    "categories": [
      "web3",
      "events",
      "culture",
      "luxury"
    ],
    "relationship": "COLLABORATION",
    "role": {
      "en": "Co-creator and programme contributor · 18 September 2024",
      "fr": "Cocréateur et contributeur au programme · 18 septembre 2024"
    },
    "oneLine": {
      "en": "The Future Fashion, on 18 September 2024 in Milan, was organised by IZY Studio and BananaConf.",
      "fr": "The Future Fashion, le 18 septembre 2024 à Milan, a été organisé par IZY Studio et BananaConf."
    },
    "summary": {
      "en": [
        "The Future Fashion, on 18 September 2024 in Milan, was organised by IZY Studio and BananaConf. Nizzar Ben Chekroune co-created it with Zarina Izy and Sander Gansen and contributed to its programme, which widened the fashion conversation to AI, AR, 3D and physical and digital creation. It followed Web3 × Fashion, a separate event held on 18 September 2023."
      ],
      "fr": [
        "The Future Fashion, le 18 septembre 2024 à Milan, a été organisé par IZY Studio et BananaConf. Nizzar Ben Chekroune l’a cocréé avec Zarina Izy et Sander Gansen et a contribué à son programme, qui élargissait la conversation sur la mode à l’IA, à la réalité augmentée, à la 3D et à la création physique et numérique. Il faisait suite à Web3 × Fashion, un événement distinct tenu le 18 septembre 2023."
      ]
    },
    "start": 2024,
    "end": 2024,
    "context": {
      "en": "THE FUTURE FASHION / WEB3 × FASHION",
      "fr": "THE FUTURE FASHION / WEB3 × FASHION"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.thefuturefashion.com"
      }
    ],
    "related": [
      "unlimitart",
      "nception",
      "bananacorp",
      "bananaconf"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "The Future Fashion, on 18 September 2024 in Milan, was organised by IZY Studio and BananaConf. Nizzar Ben Chekroune co-created it with Zarina Izy and Sander Gansen and contributed to its programme, which widened the fashion conversation to AI, AR, 3D and physical and digital creation. It followed Web3 × Fashion, a separate event held on 18 September 2023."
          ],
          "fr": [
            "The Future Fashion, le 18 septembre 2024 à Milan, a été organisé par IZY Studio et BananaConf. Nizzar Ben Chekroune l’a cocréé avec Zarina Izy et Sander Gansen et a contribué à son programme, qui élargissait la conversation sur la mode à l’IA, à la réalité augmentée, à la 3D et à la création physique et numérique. Il faisait suite à Web3 × Fashion, un événement distinct tenu le 18 septembre 2023."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "dubai-holding",
    "title": "DUBAI HOLDING",
    "aliases": [],
    "era": "web3-emerging-tech",
    "categories": [
      "web3",
      "business",
      "technology"
    ],
    "relationship": "ADVISORY",
    "role": {
      "en": "Strategic advisor · October 2021–June 2023",
      "fr": "Conseiller stratégique · octobre 2021–juin 2023"
    },
    "oneLine": {
      "en": "Strategic advisory including an real-estate tokenization model for Dubai Holding.",
      "fr": "Conseil stratégique comprenant un modèle de tokenisation immobilière pour Dubai Holding."
    },
    "summary": {
      "en": [
        "Strategic advisory including an real-estate tokenization model for Dubai Holding."
      ],
      "fr": [
        "Conseil stratégique comprenant un modèle de tokenisation immobilière pour Dubai Holding."
      ]
    },
    "start": 2021,
    "end": 2023,
    "context": {
      "en": "DUBAI HOLDING",
      "fr": "DUBAI HOLDING"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Strategic advisory including an real-estate tokenization model for Dubai Holding."
          ],
          "fr": [
            "Conseil stratégique comprenant un modèle de tokenisation immobilière pour Dubai Holding."
          ]
        }
      },
      {
        "type": "text",
        "body": {
          "en": [
            "The advisory proposed smart-contract mechanisms through which property could generate royalties on subsequent sales, reframing real-estate value beyond a single transaction."
          ],
          "fr": [
            "Le conseil proposait des mécanismes de smart contracts permettant de générer des royalties lors de reventes immobilières, pour penser la valeur au-delà d’une transaction unique."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "unitar",
    "title": "UNITAR",
    "aliases": [],
    "era": "web3-emerging-tech",
    "categories": [
      "web3",
      "institutional",
      "technology"
    ],
    "relationship": "CONSULTING",
    "role": {
      "en": "Web3 strategy and certification: concept phase from 2022, then through Berexia in 2023",
      "fr": "Stratégie Web3 et certification : phase de conception dès 2022, puis via Berexia en 2023"
    },
    "oneLine": {
      "en": "An blockchain certification system engagement for UNITAR.",
      "fr": "Une mission de système de certification blockchain pour l’UNITAR."
    },
    "summary": {
      "en": [
        "An blockchain certification system engagement for UNITAR."
      ],
      "fr": [
        "Une mission de système de certification blockchain pour l’UNITAR."
      ]
    },
    "start": 2022,
    "end": 2023,
    "context": {
      "en": "UNITAR",
      "fr": "UNITAR"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "An blockchain certification system engagement for UNITAR."
          ],
          "fr": [
            "Une mission de système de certification blockchain pour l’UNITAR."
          ]
        }
      },
      {
        "type": "text",
        "body": {
          "en": [
            "Nizzar addressed the limitations of physical certifications by introducing soulbound tokens and outlining a digital learning experience with blockchain as an entry point."
          ],
          "fr": [
            "Nizzar a abordé les limites des certifications physiques en présentant les soulbound tokens et une expérience d’apprentissage numérique utilisant la blockchain comme point d’entrée."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "arts-thread-gdgs",
    "title": "ARTS THREAD × GUCCI / GOOGLE ARTS & CULTURE",
    "aliases": [],
    "era": "culture-media",
    "categories": [
      "culture",
      "editorial"
    ],
    "relationship": "JUDGE",
    "role": {
      "en": "Selected judge · three consecutive years",
      "fr": "Membre du jury sélectionné · trois années consécutives"
    },
    "oneLine": {
      "en": "Selected as a judge for Arts Thread’s Global Design Graduate Show, in collaboration with Gucci, among an international panel of 150+ expert judges. The show was featured by Google Arts & Culture.",
      "fr": "Sélectionné comme membre du jury du Global Design Graduate Show d’Arts Thread, en collaboration avec Gucci, parmi un panel international de plus de 150 experts. Le programme a été présenté par Google Arts & Culture."
    },
    "summary": {
      "en": [
        "Selected as a judge for Arts Thread’s Global Design Graduate Show, in collaboration with Gucci, among an international panel of 150+ expert judges. The show was featured by Google Arts & Culture."
      ],
      "fr": [
        "Sélectionné comme membre du jury du Global Design Graduate Show d’Arts Thread, en collaboration avec Gucci, parmi un panel international de plus de 150 experts. Le programme a été présenté par Google Arts & Culture."
      ]
    },
    "start": 2023,
    "end": 2023,
    "context": {
      "en": "ARTS THREAD × GUCCI / GOOGLE ARTS & CULTURE",
      "fr": "ARTS THREAD × GUCCI / GOOGLE ARTS & CULTURE"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://artsandculture.google.com/story/meet-the-judges-of-the-global-design-graduate-show-global-design-graduate-show/IAUxkXdAFpJIsA"
      },
      {
        "label": {
          "en": "Arts Thread · official 2023 judges",
          "fr": "Arts Thread · jury officiel 2023"
        },
        "url": "https://www.artsthread.com/pdf/Introducing-Arts-Thread.pdf"
      },
      {
        "label": {
          "en": "My 2023 jury announcement",
          "fr": "Mon annonce du jury 2023"
        },
        "url": "https://www.linkedin.com/posts/nizzar_gucci-artsthread-globaldesigngraduateshow-activity-7061108848761135104-pqhe"
      }
    ],
    "related": [
      "mobile-photography",
      "nft-liverpool"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Selected as a judge for Arts Thread’s Global Design Graduate Show, in collaboration with Gucci, among an international panel of 150+ expert judges. The show was featured by Google Arts & Culture."
          ],
          "fr": [
            "Sélectionné comme membre du jury du Global Design Graduate Show d’Arts Thread, en collaboration avec Gucci, parmi un panel international de plus de 150 experts. Le programme a été présenté par Google Arts & Culture."
          ]
        }
      },
      {
        "type": "text",
        "body": {
          "en": [
            "The 2023 programme lists me among the judges. In my announcement that year, I described it as my third consecutive year on the jury."
          ],
          "fr": [
            "Le programme 2023 me cite parmi les membres du jury. Dans mon annonce cette année-là, je précisais qu’il s’agissait de ma troisième année consécutive au jury."
          ]
        }
      },
      {
        "type": "gallery",
        "media": [
          "arts-thread-gdgs-02",
          "arts-thread-gdgs-03"
        ],
        "layout": "grid",
        "title": {
          "en": "From the archive",
          "fr": "Dans les archives"
        }
      }
    ],
    "credits": [],
    "cover": "arts-thread-gdgs-01",
    "gallery": [
      "arts-thread-gdgs-02",
      "arts-thread-gdgs-03"
    ]
  },
  {
    "slug": "unido-creative-mediterranean",
    "title": "UNITED NATIONS / UNIDO · Creative Mediterranean",
    "aliases": [],
    "era": "institutional-creative-industries",
    "categories": [
      "institutional",
      "brand",
      "culture"
    ],
    "relationship": "INSTITUTIONAL MANDATE",
    "role": {
      "en": "Cluster development, research and digital strategy expert",
      "fr": "Expert en développement de clusters, recherche et stratégie numérique"
    },
    "oneLine": {
      "en": "Visibility, branding and digital strategy for creative and cultural industries through UNIDO’s Creative Mediterranean programme.",
      "fr": "Visibilité, marque et stratégie numérique pour les industries culturelles et créatives dans le programme Creative Mediterranean de l’ONUDI."
    },
    "summary": {
      "en": [
        "Visibility, branding and digital strategy for creative and cultural industries through UNIDO’s Creative Mediterranean programme."
      ],
      "fr": [
        "Visibilité, marque et stratégie numérique pour les industries culturelles et créatives dans le programme Creative Mediterranean de l’ONUDI."
      ]
    },
    "start": 2015,
    "end": 2019,
    "context": {
      "en": "UNITED NATIONS / UNIDO · Creative Mediterranean",
      "fr": "UNITED NATIONS / UNIDO · Creative Mediterranean"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.unido.org/stories/creative-mediterranean-resilience-built-through-creativity"
      }
    ],
    "related": [
      "la-minute-creative",
      "marrakech-creative-interiors-cluster",
      "creative-forum-ljubljana-2018"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Visibility, branding and digital strategy for creative and cultural industries through UNIDO’s Creative Mediterranean programme."
          ],
          "fr": [
            "Visibilité, marque et stratégie numérique pour les industries culturelles et créatives dans le programme Creative Mediterranean de l’ONUDI."
          ]
        }
      },
      {
        "type": "documents",
        "items": [
          {
            "title": {
              "en": "unido-TE-130034-CCI-clusters-Vol-I.pdf",
              "fr": "unido-TE-130034-CCI-clusters-Vol-I.pdf"
            },
            "href": "https://www.unido.org/sites/default/files/files/2018-09/130034_TE-Priv%20Ect%20Devpt_South%20Med_CCI%20clusters_Vol%20I.pdf",
            "meta": "Original institutional source · excerpt only"
          },
          {
            "title": {
              "en": "unido-TE-130034-CCI-clusters-Vol-II.pdf",
              "fr": "unido-TE-130034-CCI-clusters-Vol-II.pdf"
            },
            "href": "https://www.unido.org/sites/default/files/files/2018-09/130034_TE-Priv%20Ect%20Devpt_South%20Med_CCI%20clusters_Vol%20II.pdf",
            "meta": "Original institutional source · excerpt only"
          },
          {
            "title": {
              "en": "unido-TOR-130034-CreativeIndustries-TE-2017.pdf",
              "fr": "unido-TOR-130034-CreativeIndustries-TE-2017.pdf"
            },
            "href": "https://www.unido.org/sites/default/files/2017-11/InterReg-130034_TOR_CreativeIndustries_TE-2017.pdf",
            "meta": "Original institutional source · excerpt only"
          }
        ]
      },
      {
        "type": "film",
        "youtube": "R-nTC5nBeNo",
        "title": {
          "en": "ENID · UNIDO cluster development interview",
          "fr": "ENID · UNIDO cluster development interview"
        },
        "poster": "unido-creative-mediterranean-film-r-ntc5nbeno"
      },
      {
        "type": "film",
        "youtube": "lV80co6DFFs",
        "title": {
          "en": "Marrakech Creative Hub presentation",
          "fr": "Marrakech Creative Hub presentation"
        },
        "poster": "unido-creative-mediterranean-film-lv80co6dffs"
      }
    ],
    "credits": [],
    "cover": "unido-creative-mediterranean-01",
    "gallery": []
  },
  {
    "slug": "eu-unido-creative-mediterranean",
    "title": "EU / UNIDO · Creative Mediterranean",
    "aliases": [],
    "era": "institutional-creative-industries",
    "categories": [
      "institutional",
      "culture",
      "brand"
    ],
    "relationship": "INSTITUTIONAL MANDATE",
    "role": {
      "en": "Visibility and digital strategy in a regional programme",
      "fr": "Visibilité et stratégie numérique dans un programme régional"
    },
    "oneLine": {
      "en": "European institutional programme context for the Creative Mediterranean work.",
      "fr": "Contexte institutionnel européen du travail réalisé pour Creative Mediterranean."
    },
    "summary": {
      "en": [
        "European institutional programme context for the Creative Mediterranean work."
      ],
      "fr": [
        "Contexte institutionnel européen du travail réalisé pour Creative Mediterranean."
      ]
    },
    "start": 2015,
    "end": 2019,
    "context": {
      "en": "EU / UNIDO · Creative Mediterranean",
      "fr": "EU / UNIDO · Creative Mediterranean"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.unido.org/stories/creative-mediterranean-resilience-built-through-creativity"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "European institutional programme context for the Creative Mediterranean work."
          ],
          "fr": [
            "Contexte institutionnel européen du travail réalisé pour Creative Mediterranean."
          ]
        }
      }
    ],
    "credits": [],
    "cover": "eu-unido-creative-mediterranean-01",
    "gallery": []
  },
  {
    "slug": "marrakech-creative-interiors-cluster",
    "title": "MARRAKECH CREATIVE INTERIORS CLUSTER",
    "aliases": [],
    "era": "institutional-creative-industries",
    "categories": [
      "institutional",
      "brand",
      "culture"
    ],
    "relationship": "EXPERT",
    "role": {
      "en": "Branding and digital strategy · May 2015–June 2019",
      "fr": "Marque et stratégie numérique · mai 2015–juin 2019"
    },
    "oneLine": {
      "en": "Branding and digital strategy for the creative interiors cluster and its network of artisans.",
      "fr": "Marque et stratégie numérique pour le cluster des intérieurs créatifs et son réseau d’artisans."
    },
    "summary": {
      "en": [
        "Branding and digital strategy for the creative interiors cluster and its network of artisans."
      ],
      "fr": [
        "Marque et stratégie numérique pour le cluster des intérieurs créatifs et son réseau d’artisans."
      ]
    },
    "start": 2015,
    "end": 2019,
    "context": {
      "en": "MARRAKECH CREATIVE INTERIORS CLUSTER",
      "fr": "MARRAKECH CREATIVE INTERIORS CLUSTER"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [
      "la-minute-creative",
      "unido-creative-mediterranean",
      "creative-forum-ljubljana-2018"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Branding and digital strategy for the creative interiors cluster and its network of artisans."
          ],
          "fr": [
            "Marque et stratégie numérique pour le cluster des intérieurs créatifs et son réseau d’artisans."
          ]
        }
      },
      {
        "title": {
          "en": "Workshop Electronique Artisanat & Design @ Emerging Business Factory reporatge Made in Marrakech",
          "fr": "Workshop Electronique Artisanat & Design @ Emerging Business Factory reporatge Made in Marrakech"
        },
        "youtube": "CTGte__8K4w",
        "poster": "marrakech-creative-interiors-cluster-01",
        "type": "film"
      },
      {
        "title": {
          "en": "Marrakech Creative Interiors Cluster * Presentation",
          "fr": "Marrakech Creative Interiors Cluster * Presentation"
        },
        "youtube": "J82pCGI-wUM",
        "poster": "marrakech-creative-interiors-cluster-02",
        "type": "film"
      },
      {
        "title": {
          "en": "Minyadina COP22 - Marrakech Creative interiors Cluster",
          "fr": "Minyadina COP22 - Marrakech Creative interiors Cluster"
        },
        "youtube": "PUgOg_T41aA",
        "poster": "marrakech-creative-interiors-cluster-03",
        "type": "film"
      },
      {
        "title": {
          "en": "ARGANE #1 - Moroccan Rocket for Marrakech Creative Interiors Cluster",
          "fr": "ARGANE #1 - Moroccan Rocket for Marrakech Creative Interiors Cluster"
        },
        "youtube": "bTtQPaUiaTg",
        "poster": "marrakech-creative-interiors-cluster-04",
        "type": "film"
      },
      {
        "title": {
          "en": "ARGANE #1 - Vernissage Marrakech Creative Interiors Cluster",
          "fr": "ARGANE #1 - Vernissage Marrakech Creative Interiors Cluster"
        },
        "youtube": "rgIBnx_FCgY",
        "poster": "marrakech-creative-interiors-cluster-05",
        "type": "film"
      },
      {
        "type": "gallery",
        "media": [
          "marrakech-creative-interiors-cluster-02",
          "marrakech-creative-interiors-cluster-03",
          "marrakech-creative-interiors-cluster-04",
          "marrakech-creative-interiors-cluster-05"
        ],
        "layout": "grid",
        "title": {
          "en": "From the archive",
          "fr": "Dans les archives"
        }
      }
    ],
    "credits": [],
    "cover": "marrakech-creative-interiors-cluster-01",
    "gallery": [
      "marrakech-creative-interiors-cluster-02",
      "marrakech-creative-interiors-cluster-03",
      "marrakech-creative-interiors-cluster-04",
      "marrakech-creative-interiors-cluster-05"
    ]
  },
  {
    "slug": "un-women-pwe",
    "title": "UNIDO · WOMEN’S EMPOWERMENT / PWE",
    "aliases": [],
    "era": "institutional-creative-industries",
    "categories": [
      "institutional",
      "brand",
      "technology"
    ],
    "relationship": "EXPERT",
    "role": {
      "en": "Research and digital strategy · October 2020–October 2021",
      "fr": "Recherche et stratégie numérique · octobre 2020–octobre 2021"
    },
    "oneLine": {
      "en": "Research and digital strategy in the women’s empowerment programme. Historical portfolio labels are preserved separately from the programme’s institutional attribution.",
      "fr": "Recherche et stratégie numérique dans le programme d’autonomisation des femmes. Les anciennes appellations du portfolio sont conservées séparément de l’attribution institutionnelle du programme."
    },
    "summary": {
      "en": [
        "Research and digital strategy in the women’s empowerment programme. Historical portfolio labels are preserved separately from the programme’s institutional attribution."
      ],
      "fr": [
        "Recherche et stratégie numérique dans le programme d’autonomisation des femmes. Les anciennes appellations du portfolio sont conservées séparément de l’attribution institutionnelle du programme."
      ]
    },
    "start": 2020,
    "end": 2021,
    "context": {
      "en": "UNIDO · WOMEN’S EMPOWERMENT / PWE",
      "fr": "UNIDO · WOMEN’S EMPOWERMENT / PWE"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Research and digital strategy in the women’s empowerment programme. Historical portfolio labels are preserved separately from the programme’s institutional attribution."
          ],
          "fr": [
            "Recherche et stratégie numérique dans le programme d’autonomisation des femmes. Les anciennes appellations du portfolio sont conservées séparément de l’attribution institutionnelle du programme."
          ]
        }
      }
    ],
    "credits": [],
    "cover": "un-women-pwe-01",
    "gallery": []
  },
  {
    "slug": "usaid-career-centers",
    "title": "USAID · CAREER CENTERS",
    "aliases": [],
    "era": "institutional-creative-industries",
    "categories": [
      "institutional",
      "business",
      "brand"
    ],
    "relationship": "EXPERT",
    "role": {
      "en": "Business development and digital marketing",
      "fr": "Développement commercial et marketing numérique"
    },
    "oneLine": {
      "en": "Connecting industry leaders and university students through Career Centers, supported by marketing materials and business development.",
      "fr": "Relier les acteurs économiques et les étudiants grâce aux Career Centers, avec des supports marketing et du développement commercial."
    },
    "summary": {
      "en": [
        "Connecting industry leaders and university students through Career Centers, supported by marketing materials and business development."
      ],
      "fr": [
        "Relier les acteurs économiques et les étudiants grâce aux Career Centers, avec des supports marketing et du développement commercial."
      ]
    },
    "start": 2017,
    "end": 2019,
    "context": {
      "en": "USAID · CAREER CENTERS",
      "fr": "USAID · CAREER CENTERS"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.isg-alumni.com/news/portrait-d-alumni-1185"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Connecting industry leaders and university students through Career Centers, supported by marketing materials and business development."
          ],
          "fr": [
            "Relier les acteurs économiques et les étudiants grâce aux Career Centers, avec des supports marketing et du développement commercial."
          ]
        }
      }
    ],
    "credits": [],
    "cover": "usaid-career-centers-01",
    "gallery": []
  },
  {
    "slug": "iom-compass",
    "title": "IOM · COMPASS",
    "aliases": [],
    "era": "institutional-creative-industries",
    "categories": [
      "institutional",
      "brand"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "Branding, social media strategy and content templates",
      "fr": "Marque, stratégie des réseaux sociaux et modèles de contenus"
    },
    "oneLine": {
      "en": "Branding and social media strategy for IOM’s COMPASS programme, with reusable content templates.",
      "fr": "Marque et stratégie des réseaux sociaux pour le programme COMPASS de l’OIM, avec des modèles de contenus réutilisables."
    },
    "summary": {
      "en": [
        "Branding and social media strategy for IOM’s COMPASS programme, with reusable content templates."
      ],
      "fr": [
        "Marque et stratégie des réseaux sociaux pour le programme COMPASS de l’OIM, avec des modèles de contenus réutilisables."
      ]
    },
    "start": 2020,
    "end": 2020,
    "context": {
      "en": "IOM · COMPASS",
      "fr": "IOM · COMPASS"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Branding and social media strategy for IOM’s COMPASS programme, with reusable content templates."
          ],
          "fr": [
            "Marque et stratégie des réseaux sociaux pour le programme COMPASS de l’OIM, avec des modèles de contenus réutilisables."
          ]
        }
      }
    ],
    "credits": [],
    "cover": "iom-compass-01",
    "gallery": []
  },
  {
    "slug": "oif-francophonie",
    "title": "OIF · SOLIDARITÉ COVID",
    "aliases": [],
    "era": "institutional-creative-industries",
    "categories": [
      "institutional",
      "media",
      "editorial"
    ],
    "relationship": "INSTITUTIONAL MANDATE",
    "role": {
      "en": "Special project manager and remote interview production",
      "fr": "Responsable de projet spécial et production d’entretiens à distance"
    },
    "oneLine": {
      "en": "Remote video interviews with entrepreneurs and creatives during the pandemic, produced through Arroz Con Pollo for the Organisation Internationale de la Francophonie.",
      "fr": "Entretiens vidéo à distance avec des entrepreneurs et créateurs pendant la pandémie, produits avec Arroz Con Pollo pour l’Organisation internationale de la Francophonie."
    },
    "summary": {
      "en": [
        "Remote video interviews with entrepreneurs and creatives during the pandemic, produced through Arroz Con Pollo for the Organisation Internationale de la Francophonie."
      ],
      "fr": [
        "Entretiens vidéo à distance avec des entrepreneurs et créateurs pendant la pandémie, produits avec Arroz Con Pollo pour l’Organisation internationale de la Francophonie."
      ]
    },
    "start": 2020,
    "end": 2020,
    "context": {
      "en": "OIF · SOLIDARITÉ COVID",
      "fr": "OIF · SOLIDARITÉ COVID"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.arrozconpollo.studio/oif"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Remote video interviews with entrepreneurs and creatives during the pandemic, produced through Arroz Con Pollo for the Organisation Internationale de la Francophonie."
          ],
          "fr": [
            "Entretiens vidéo à distance avec des entrepreneurs et créateurs pendant la pandémie, produits avec Arroz Con Pollo pour l’Organisation internationale de la Francophonie."
          ]
        }
      },
      {
        "type": "film",
        "youtube": "HW_gsxz3rv0",
        "title": {
          "en": "Laurette Bira × OIF",
          "fr": "Laurette Bira × OIF"
        },
        "poster": "oif-francophonie-film-hw-gsxz3rv0"
      }
    ],
    "credits": [
      {
        "name": "Arroz Con Pollo",
        "role": {
          "en": "Creative studio and production team",
          "fr": "Studio créatif et équipe de production"
        }
      }
    ],
    "studio": "arroz-con-pollo",
    "cover": "oif-francophonie-01",
    "gallery": []
  },
  {
    "slug": "nepad",
    "title": "NEPAD · INFRASTRUCTURE PROJECT PREPARATION FACILITY",
    "aliases": [],
    "era": "institutional-creative-industries",
    "categories": [
      "institutional",
      "brand"
    ],
    "relationship": "EXPERT",
    "role": {
      "en": "Digital marketing expert · August–September 2020",
      "fr": "Expert en marketing numérique · août–septembre 2020"
    },
    "oneLine": {
      "en": "Digital marketing work for NEPAD’s Infrastructure Project Preparation Facility.",
      "fr": "Travail de marketing numérique pour le mécanisme de préparation des projets d’infrastructure du NEPAD."
    },
    "summary": {
      "en": [
        "Digital marketing work for NEPAD’s Infrastructure Project Preparation Facility."
      ],
      "fr": [
        "Travail de marketing numérique pour le mécanisme de préparation des projets d’infrastructure du NEPAD."
      ]
    },
    "start": 2020,
    "end": 2020,
    "context": {
      "en": "NEPAD · INFRASTRUCTURE PROJECT PREPARATION FACILITY",
      "fr": "NEPAD · INFRASTRUCTURE PROJECT PREPARATION FACILITY"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Digital marketing work for NEPAD’s Infrastructure Project Preparation Facility."
          ],
          "fr": [
            "Travail de marketing numérique pour le mécanisme de préparation des projets d’infrastructure du NEPAD."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "houna-design-talks",
    "title": "HOUNA DESIGN",
    "aliases": [],
    "era": "institutional-creative-industries",
    "categories": [
      "culture",
      "events",
      "institutional"
    ],
    "relationship": "SPEAKER",
    "role": {
      "en": "UNIDO cluster development expert and speaker",
      "fr": "Expert en développement de clusters ONUDI et intervenant"
    },
    "oneLine": {
      "en": "Design talks bringing creators and the public together, including Nizzar’s UNIDO expert contribution in April 2017.",
      "fr": "Des rencontres autour du design entre créateurs et public, avec une intervention de Nizzar comme expert ONUDI en avril 2017."
    },
    "summary": {
      "en": [
        "Design talks bringing creators and the public together, including Nizzar’s UNIDO expert contribution in April 2017."
      ],
      "fr": [
        "Des rencontres autour du design entre créateurs et public, avec une intervention de Nizzar comme expert ONUDI en avril 2017."
      ]
    },
    "start": 2017,
    "end": 2017,
    "context": {
      "en": "HOUNA DESIGN",
      "fr": "HOUNA DESIGN"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://femmesdumaroc.com/archives/lassociation-houna-lance-son-premier-design-talk-a-casablanca"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Design talks bringing creators and the public together, including Nizzar’s UNIDO expert contribution in April 2017."
          ],
          "fr": [
            "Des rencontres autour du design entre créateurs et public, avec une intervention de Nizzar comme expert ONUDI en avril 2017."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "creative-forum-ljubljana-2018",
    "title": "CREATIVE FORUM LJUBLJANA",
    "aliases": [],
    "era": "institutional-creative-industries",
    "categories": [
      "events",
      "institutional",
      "technology"
    ],
    "relationship": "SPEAKER",
    "role": {
      "en": "Digital communication and marketing expert, UNIDO",
      "fr": "Expert en communication numérique et marketing, ONUDI"
    },
    "oneLine": {
      "en": "Presenting creative industries and digital economy work at Creative Forum Ljubljana in April 2018.",
      "fr": "Présentation du travail sur les industries créatives et l’économie numérique au Creative Forum Ljubljana en avril 2018."
    },
    "summary": {
      "en": [
        "Presenting creative industries and digital economy work at Creative Forum Ljubljana in April 2018."
      ],
      "fr": [
        "Présentation du travail sur les industries créatives et l’économie numérique au Creative Forum Ljubljana en avril 2018."
      ]
    },
    "start": 2018,
    "end": 2018,
    "context": {
      "en": "CREATIVE FORUM LJUBLJANA",
      "fr": "CREATIVE FORUM LJUBLJANA"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.youtube.com/watch?v=vE08--Cp7ho"
      }
    ],
    "related": [
      "la-minute-creative",
      "unido-creative-mediterranean",
      "marrakech-creative-interiors-cluster"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Presenting creative industries and digital economy work at Creative Forum Ljubljana in April 2018."
          ],
          "fr": [
            "Présentation du travail sur les industries créatives et l’économie numérique au Creative Forum Ljubljana en avril 2018."
          ]
        }
      },
      {
        "type": "documents",
        "items": [
          {
            "title": {
              "en": "Creative Forum Ljubljana · 2018 programme",
              "fr": "Creative Forum Ljubljana · programme 2018"
            },
            "href": "http://www.seecult.org/sites/default/files/attachments/creative_forum_ljubljana_conference_programme.pdf",
            "meta": "Original institutional source · excerpt only"
          }
        ]
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "oasis-festival",
    "title": "OASIS FESTIVAL · MOROCCAN SQUARE",
    "aliases": [],
    "era": "culture-media",
    "categories": [
      "culture",
      "events",
      "experience",
      "business"
    ],
    "relationship": "COLLABORATION",
    "role": {
      "en": "Food experience design and management, with a team",
      "fr": "Conception et gestion de l’expérience culinaire, en équipe"
    },
    "oneLine": {
      "en": "Nizzar and his team designed and managed the festival’s food experience and created the Moroccan Square.",
      "fr": "Nizzar et son équipe ont conçu et géré l’expérience culinaire du festival et créé le Moroccan Square."
    },
    "summary": {
      "en": [
        "Nizzar and his team designed and managed the festival’s food experience and created the Moroccan Square."
      ],
      "fr": [
        "Nizzar et son équipe ont conçu et géré l’expérience culinaire du festival et créé le Moroccan Square."
      ]
    },
    "start": 2016,
    "end": 2021,
    "context": {
      "en": "OASIS FESTIVAL · MOROCCAN SQUARE",
      "fr": "OASIS FESTIVAL · MOROCCAN SQUARE"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Nizzar and his team designed and managed the festival’s food experience and created the Moroccan Square."
          ],
          "fr": [
            "Nizzar et son équipe ont conçu et géré l’expérience culinaire du festival et créé le Moroccan Square."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "arroz-con-pollo",
    "title": "ARROZ CON POLLO",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "culture",
      "editorial",
      "media"
    ],
    "relationship": "CO-FOUNDER",
    "role": {
      "en": "Co-founder with Nabil Nadifi · 2019–2022",
      "fr": "Cofondateur avec Nabil Nadifi · 2019–2022"
    },
    "oneLine": {
      "en": "A creative studio founded by Nizzar Ben Chekroune and Nabil Nadifi, with work credited to the studio and its contributors. Nizzar left in 2022.",
      "fr": "Un studio créatif fondé par Nizzar Ben Chekroune et Nabil Nadifi, dont les travaux sont attribués au studio et à ses contributeurs. Nizzar l’a quitté en 2022."
    },
    "summary": {
      "en": [
        "A creative studio founded by Nizzar Ben Chekroune and Nabil Nadifi, with work credited to the studio and its contributors. Nizzar left in 2022."
      ],
      "fr": [
        "Un studio créatif fondé par Nizzar Ben Chekroune et Nabil Nadifi, dont les travaux sont attribués au studio et à ses contributeurs. Nizzar l’a quitté en 2022."
      ]
    },
    "start": 2019,
    "end": 2022,
    "context": {
      "en": "ARROZ CON POLLO",
      "fr": "ARROZ CON POLLO"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.arrozconpollo.studio"
      }
    ],
    "related": [
      "diptyk",
      "audi-driven-by-art",
      "ocp"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "A creative studio founded by Nizzar Ben Chekroune and Nabil Nadifi, with work credited to the studio and its contributors. Nizzar left in 2022."
          ],
          "fr": [
            "Un studio créatif fondé par Nizzar Ben Chekroune et Nabil Nadifi, dont les travaux sont attribués au studio et à ses contributeurs. Nizzar l’a quitté en 2022."
          ]
        }
      },
      {
        "type": "gallery",
        "media": [
          "arroz-con-pollo-03",
          "arroz-con-pollo-04",
          "arroz-con-pollo-05"
        ],
        "layout": "grid",
        "title": {
          "en": "From the archive",
          "fr": "Dans les archives"
        }
      }
    ],
    "credits": [],
    "cover": "arroz-con-pollo-02",
    "gallery": [
      "arroz-con-pollo-03",
      "arroz-con-pollo-04",
      "arroz-con-pollo-05"
    ]
  },
  {
    "slug": "street-view-inside",
    "title": "STREET VIEW INSIDE / WE360",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "technology",
      "experience",
      "brand"
    ],
    "relationship": "COLLABORATION",
    "role": {
      "en": "Managing director, historical record (2016)",
      "fr": "Directeur général, parcours historique (2016)"
    },
    "oneLine": {
      "en": "Virtual-reality and immersive digital experiences using Google technology through Street View Inside / We360.",
      "fr": "Réalité virtuelle et expériences numériques immersives utilisant la technologie Google avec Street View Inside / We360."
    },
    "summary": {
      "en": [
        "Virtual-reality and immersive digital experiences using Google technology through Street View Inside / We360."
      ],
      "fr": [
        "Réalité virtuelle et expériences numériques immersives utilisant la technologie Google avec Street View Inside / We360."
      ]
    },
    "start": 2016,
    "end": 2016,
    "context": {
      "en": "STREET VIEW INSIDE / WE360",
      "fr": "STREET VIEW INSIDE / WE360"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Virtual-reality and immersive digital experiences using Google technology through Street View Inside / We360."
          ],
          "fr": [
            "Réalité virtuelle et expériences numériques immersives utilisant la technologie Google avec Street View Inside / We360."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "la-cuisine-de-mami-bahia",
    "title": "LA CUISINE DE MAMI BAHIA",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "business",
      "experience"
    ],
    "relationship": "FOUNDER",
    "role": {
      "en": "Brand creation and development",
      "fr": "Création et développement de marque"
    },
    "oneLine": {
      "en": "Building a food brand, documented in Nizzar’s 2015 article and 2016 follow-up.",
      "fr": "Création d’une marque culinaire, documentée dans un article de Nizzar en 2015 et son suivi en 2016."
    },
    "summary": {
      "en": [
        "Building a food brand, documented in Nizzar’s 2015 article and 2016 follow-up."
      ],
      "fr": [
        "Création d’une marque culinaire, documentée dans un article de Nizzar en 2015 et son suivi en 2016."
      ]
    },
    "start": 2015,
    "end": null,
    "context": {
      "en": "LA CUISINE DE MAMI BAHIA",
      "fr": "LA CUISINE DE MAMI BAHIA"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Building a food brand, documented in Nizzar’s 2015 article and 2016 follow-up."
          ],
          "fr": [
            "Création d’une marque culinaire, documentée dans un article de Nizzar en 2015 et son suivi en 2016."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "quantum-branding",
    "title": "QUANTUM BRANDING",
    "aliases": [],
    "era": "brand-ai-business",
    "categories": [
      "brand",
      "ai",
      "business",
      "technology"
    ],
    "relationship": "FOUNDER",
    "role": {
      "en": "Founder and Brand Strategist",
      "fr": "Fondateur et stratégiste de marque"
    },
    "oneLine": {
      "en": "An independent practice at the intersection of Brand × AI × Business. Work began in late 2023; the practice was established in 2024.",
      "fr": "Une pratique indépendante à l’intersection de la marque, de l’IA et du business. Le travail a commencé fin 2023 ; la pratique a été établie en 2024."
    },
    "summary": {
      "en": [
        "An independent practice at the intersection of Brand × AI × Business. Work began in late 2023; the practice was established in 2024."
      ],
      "fr": [
        "Une pratique indépendante à l’intersection de la marque, de l’IA et du business. Le travail a commencé fin 2023 ; la pratique a été établie en 2024."
      ]
    },
    "start": 2023,
    "end": "present",
    "context": {
      "en": "QUANTUM BRANDING",
      "fr": "QUANTUM BRANDING"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://thequantumbranding.com"
      }
    ],
    "related": [
      "brandos",
      "verne-jewels",
      "selvaggi",
      "africa-business-school"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "An independent practice at the intersection of Brand × AI × Business. Work began in late 2023; the practice was established in 2024."
          ],
          "fr": [
            "Une pratique indépendante à l’intersection de la marque, de l’IA et du business. Le travail a commencé fin 2023 ; la pratique a été établie en 2024."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "brandos",
    "title": "BrandOS",
    "aliases": [],
    "era": "brand-ai-business",
    "categories": [
      "brand",
      "ai",
      "technology",
      "business"
    ],
    "relationship": "FOUNDER",
    "role": {
      "en": "Product creator",
      "fr": "Créateur du produit"
    },
    "oneLine": {
      "en": "A product built from the Quantum Branding practice, encoding and augmenting parts of its work.",
      "fr": "Un produit issu de la pratique Quantum Branding, qui encode et augmente certaines dimensions de son travail."
    },
    "summary": {
      "en": [
        "A product built from the Quantum Branding practice, encoding and augmenting parts of its work."
      ],
      "fr": [
        "Un produit issu de la pratique Quantum Branding, qui encode et augmente certaines dimensions de son travail."
      ]
    },
    "start": 2024,
    "end": "present",
    "context": {
      "en": "BrandOS",
      "fr": "BrandOS"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://quantumbranding.ai"
      }
    ],
    "related": [
      "quantum-branding",
      "verne-jewels",
      "selvaggi",
      "africa-business-school"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "A product built from the Quantum Branding practice, encoding and augmenting parts of its work."
          ],
          "fr": [
            "Un produit issu de la pratique Quantum Branding, qui encode et augmente certaines dimensions de son travail."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "rbmg",
    "title": "RBMG / RACHID BELAZIZ",
    "aliases": [],
    "era": "brand-ai-business",
    "categories": [
      "brand",
      "business"
    ],
    "relationship": "PARTNERSHIP",
    "role": {
      "en": "Operating Partner",
      "fr": "Operating Partner"
    },
    "oneLine": {
      "en": "Joint project work with Rachid Belaziz / RBMG, alongside Nizzar’s independent practice.",
      "fr": "Travail sur des projets communs avec Rachid Belaziz / RBMG, aux côtés de la pratique indépendante de Nizzar."
    },
    "summary": {
      "en": [
        "Joint project work with Rachid Belaziz / RBMG, alongside Nizzar’s independent practice."
      ],
      "fr": [
        "Travail sur des projets communs avec Rachid Belaziz / RBMG, aux côtés de la pratique indépendante de Nizzar."
      ]
    },
    "start": 2026,
    "end": null,
    "context": {
      "en": "RBMG / RACHID BELAZIZ",
      "fr": "RBMG / RACHID BELAZIZ"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://fr.linkedin.com/pulse/lentrepreneuriat-vu-du-terrain-nxx-lentreprise-est-brand%C3%A9e-belaziz-auxve"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Joint project work with Rachid Belaziz / RBMG, alongside Nizzar’s independent practice."
          ],
          "fr": [
            "Travail sur des projets communs avec Rachid Belaziz / RBMG, aux côtés de la pratique indépendante de Nizzar."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "technikart",
    "title": "TECHNIKART",
    "aliases": [],
    "era": "early-creative-editorial",
    "categories": [
      "editorial",
      "media"
    ],
    "relationship": "EDITORIAL",
    "role": {
      "en": "Magazine editor · March 2008",
      "fr": "Rédacteur · mars 2008"
    },
    "oneLine": {
      "en": "Editorial work including an interview with Antonio Maria Costa on stars and drugs.",
      "fr": "Travail éditorial comprenant un entretien avec Antonio Maria Costa sur les célébrités et les drogues."
    },
    "summary": {
      "en": [
        "Editorial work including an interview with Antonio Maria Costa on stars and drugs."
      ],
      "fr": [
        "Travail éditorial comprenant un entretien avec Antonio Maria Costa sur les célébrités et les drogues."
      ]
    },
    "start": 2008,
    "end": 2008,
    "context": {
      "en": "TECHNIKART",
      "fr": "TECHNIKART"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Editorial work including an interview with Antonio Maria Costa on stars and drugs."
          ],
          "fr": [
            "Travail éditorial comprenant un entretien avec Antonio Maria Costa sur les célébrités et les drogues."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "unov",
    "title": "UNITED NATIONS OFFICE AT VIENNA",
    "aliases": [],
    "era": "institutional-creative-industries",
    "categories": [
      "institutional",
      "business"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "Procurement service intern · October 2007–April 2008",
      "fr": "Stagiaire au service achats · octobre 2007–avril 2008"
    },
    "oneLine": {
      "en": "A procurement-service internship recorded in the owner’s corrected professional profile.",
      "fr": "Un stage au service achats documenté dans le profil professionnel corrigé de Nizzar."
    },
    "summary": {
      "en": [
        "A procurement-service internship recorded in the owner’s corrected professional profile."
      ],
      "fr": [
        "Un stage au service achats documenté dans le profil professionnel corrigé de Nizzar."
      ]
    },
    "start": 2007,
    "end": 2008,
    "context": {
      "en": "UNITED NATIONS OFFICE AT VIENNA",
      "fr": "UNITED NATIONS OFFICE AT VIENNA"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "A procurement-service internship recorded in the owner’s corrected professional profile."
          ],
          "fr": [
            "Un stage au service achats documenté dans le profil professionnel corrigé de Nizzar."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "beachcomber",
    "title": "BEACHCOMBER RESORTS & HOTELS",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "business",
      "luxury",
      "experience"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "Real estate sales and digital expert · January 2013–May 2015",
      "fr": "Expert en ventes immobilières et numérique · janvier 2013–mai 2015"
    },
    "oneLine": {
      "en": "Real estate sales and digital work in the hospitality sector.",
      "fr": "Ventes immobilières et travail numérique dans l’hôtellerie."
    },
    "summary": {
      "en": [
        "Real estate sales and digital work in the hospitality sector."
      ],
      "fr": [
        "Ventes immobilières et travail numérique dans l’hôtellerie."
      ]
    },
    "start": 2013,
    "end": 2015,
    "context": {
      "en": "BEACHCOMBER RESORTS & HOTELS",
      "fr": "BEACHCOMBER RESORTS & HOTELS"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Real estate sales and digital work in the hospitality sector."
          ],
          "fr": [
            "Ventes immobilières et travail numérique dans l’hôtellerie."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "es-saadi-theatro",
    "title": "ES SAADI / THEATRO MARRAKECH",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "experience",
      "events",
      "brand"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "Public relations and digital manager · March 2009–March 2011",
      "fr": "Responsable relations publiques et numérique · mars 2009–mars 2011"
    },
    "oneLine": {
      "en": "Public relations, events and digital management in hospitality and nightlife.",
      "fr": "Relations publiques, événements et gestion numérique dans l’hôtellerie et la vie nocturne."
    },
    "summary": {
      "en": [
        "Public relations, events and digital management in hospitality and nightlife."
      ],
      "fr": [
        "Relations publiques, événements et gestion numérique dans l’hôtellerie et la vie nocturne."
      ]
    },
    "start": 2009,
    "end": 2011,
    "context": {
      "en": "ES SAADI / THEATRO MARRAKECH",
      "fr": "ES SAADI / THEATRO MARRAKECH"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Public relations, events and digital management in hospitality and nightlife."
          ],
          "fr": [
            "Relations publiques, événements et gestion numérique dans l’hôtellerie et la vie nocturne."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "hanoot",
    "title": "HANOOT",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "business",
      "experience"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "Concept, identity and operational development",
      "fr": "Concept, identité et développement opérationnel"
    },
    "oneLine": {
      "en": "Concept creation, visual identity, communication, staffing and strategic positioning.",
      "fr": "Création du concept, identité visuelle, communication, recrutement et positionnement stratégique."
    },
    "summary": {
      "en": [
        "Concept creation, visual identity, communication, staffing and strategic positioning."
      ],
      "fr": [
        "Création du concept, identité visuelle, communication, recrutement et positionnement stratégique."
      ]
    },
    "start": 2011,
    "end": 2012,
    "context": {
      "en": "HANOOT",
      "fr": "HANOOT"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Concept creation, visual identity, communication, staffing and strategic positioning."
          ],
          "fr": [
            "Création du concept, identité visuelle, communication, recrutement et positionnement stratégique."
          ]
        }
      }
    ],
    "credits": [],
    "cover": "hanoot-01",
    "gallery": []
  },
  {
    "slug": "myah-bay",
    "title": "MYAH BAY",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "events",
      "business"
    ],
    "relationship": "CONSULTING",
    "role": {
      "en": "Audit, positioning and launch communication",
      "fr": "Audit, positionnement et communication de lancement"
    },
    "oneLine": {
      "en": "An internal audit and local-market adaptation, communication tools and a launch event.",
      "fr": "Un audit interne et une adaptation au marché local, des outils de communication et un événement de lancement."
    },
    "summary": {
      "en": [
        "An internal audit and local-market adaptation, communication tools and a launch event."
      ],
      "fr": [
        "Un audit interne et une adaptation au marché local, des outils de communication et un événement de lancement."
      ]
    },
    "start": 2012,
    "end": 2012,
    "context": {
      "en": "MYAH BAY",
      "fr": "MYAH BAY"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "An internal audit and local-market adaptation, communication tools and a launch event."
          ],
          "fr": [
            "Un audit interne et une adaptation au marché local, des outils de communication et un événement de lancement."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "destination-evasion-maroc",
    "title": "DESTINATION ÉVASION MAROC",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "experience",
      "media"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "Website identity, marketing and photography",
      "fr": "Identité du site, marketing et photographie"
    },
    "oneLine": {
      "en": "Website visual identity, benchmarking, relationship marketing and team photography.",
      "fr": "Identité visuelle du site, analyse concurrentielle, marketing relationnel et photographie de l’équipe."
    },
    "summary": {
      "en": [
        "Website visual identity, benchmarking, relationship marketing and team photography."
      ],
      "fr": [
        "Identité visuelle du site, analyse concurrentielle, marketing relationnel et photographie de l’équipe."
      ]
    },
    "start": 2012,
    "end": 2012,
    "context": {
      "en": "DESTINATION ÉVASION MAROC",
      "fr": "DESTINATION ÉVASION MAROC"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Website visual identity, benchmarking, relationship marketing and team photography."
          ],
          "fr": [
            "Identité visuelle du site, analyse concurrentielle, marketing relationnel et photographie de l’équipe."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "kechnight",
    "title": "KECHNIGHT",
    "aliases": [],
    "era": "early-creative-editorial",
    "categories": [
      "editorial",
      "business"
    ],
    "relationship": "EDITORIAL",
    "role": {
      "en": "Writer and guide development",
      "fr": "Rédacteur et développement de guide"
    },
    "oneLine": {
      "en": "Articles and development of a Marrakech nightlife guide, alongside sponsor development.",
      "fr": "Articles et développement d’un guide de la vie nocturne de Marrakech, avec recherche de partenaires."
    },
    "summary": {
      "en": [
        "Articles and development of a Marrakech nightlife guide, alongside sponsor development."
      ],
      "fr": [
        "Articles et développement d’un guide de la vie nocturne de Marrakech, avec recherche de partenaires."
      ]
    },
    "start": 2011,
    "end": 2012,
    "context": {
      "en": "KECHNIGHT",
      "fr": "KECHNIGHT"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Articles and development of a Marrakech nightlife guide, alongside sponsor development."
          ],
          "fr": [
            "Articles et développement d’un guide de la vie nocturne de Marrakech, avec recherche de partenaires."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "suite-club",
    "title": "SUITE CLUB",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "events",
      "experience"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "Positioning, communication and community management",
      "fr": "Positionnement, communication et animation de communauté"
    },
    "oneLine": {
      "en": "Local positioning, advertising materials, public relations tools and weekly events.",
      "fr": "Positionnement local, supports publicitaires, outils de relations publiques et événements hebdomadaires."
    },
    "summary": {
      "en": [
        "Local positioning, advertising materials, public relations tools and weekly events."
      ],
      "fr": [
        "Positionnement local, supports publicitaires, outils de relations publiques et événements hebdomadaires."
      ]
    },
    "start": 2011,
    "end": 2012,
    "context": {
      "en": "SUITE CLUB",
      "fr": "SUITE CLUB"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Local positioning, advertising materials, public relations tools and weekly events."
          ],
          "fr": [
            "Positionnement local, supports publicitaires, outils de relations publiques et événements hebdomadaires."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "marrakech-du-rire",
    "title": "MARRAKECH DU RIRE / AFTERSHOW",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "events",
      "business",
      "experience"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "Sales strategy, team management and public relations",
      "fr": "Stratégie commerciale, gestion d’équipe et relations publiques"
    },
    "oneLine": {
      "en": "Operational sales and public relations for gala and aftershow activity, working with a team.",
      "fr": "Ventes opérationnelles et relations publiques pour les galas et soirées, en équipe."
    },
    "summary": {
      "en": [
        "Operational sales and public relations for gala and aftershow activity, working with a team."
      ],
      "fr": [
        "Ventes opérationnelles et relations publiques pour les galas et soirées, en équipe."
      ]
    },
    "start": 2011,
    "end": 2014,
    "context": {
      "en": "MARRAKECH DU RIRE / AFTERSHOW",
      "fr": "MARRAKECH DU RIRE / AFTERSHOW"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Operational sales and public relations for gala and aftershow activity, working with a team."
          ],
          "fr": [
            "Ventes opérationnelles et relations publiques pour les galas et soirées, en équipe."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "hivos-african-crossroads",
    "title": "HIVOS · AFRICAN CROSSROADS",
    "aliases": [],
    "era": "institutional-creative-industries",
    "categories": [
      "institutional",
      "culture",
      "events"
    ],
    "relationship": "COLLABORATION",
    "role": {
      "en": "Project manager and UNIDO workshop presenter",
      "fr": "Chef de projet et intervenant atelier ONUDI"
    },
    "oneLine": {
      "en": "A day presenting Marrakech handicrafts and a workshop on UNIDO’s strategy during African Crossroads.",
      "fr": "Une journée de présentation de l’artisanat de Marrakech et un atelier sur la stratégie de l’ONUDI à African Crossroads."
    },
    "summary": {
      "en": [
        "A day presenting Marrakech handicrafts and a workshop on UNIDO’s strategy during African Crossroads."
      ],
      "fr": [
        "Une journée de présentation de l’artisanat de Marrakech et un atelier sur la stratégie de l’ONUDI à African Crossroads."
      ]
    },
    "start": 2018,
    "end": 2018,
    "context": {
      "en": "HIVOS · AFRICAN CROSSROADS",
      "fr": "HIVOS · AFRICAN CROSSROADS"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "A day presenting Marrakech handicrafts and a workshop on UNIDO’s strategy during African Crossroads."
          ],
          "fr": [
            "Une journée de présentation de l’artisanat de Marrakech et un atelier sur la stratégie de l’ONUDI à African Crossroads."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "high-atlas-foundation",
    "title": "HIGH ATLAS FOUNDATION",
    "aliases": [],
    "era": "institutional-creative-industries",
    "categories": [
      "institutional",
      "business"
    ],
    "relationship": "BOARD",
    "role": {
      "en": "US board member, current owner-confirmed role",
      "fr": "Membre du conseil américain, rôle actuel confirmé par Nizzar"
    },
    "oneLine": {
      "en": "Board participation supporting the High Atlas Foundation’s development mission.",
      "fr": "Participation au conseil au service de la mission de développement de la High Atlas Foundation."
    },
    "summary": {
      "en": [
        "Board participation supporting the High Atlas Foundation’s development mission."
      ],
      "fr": [
        "Participation au conseil au service de la mission de développement de la High Atlas Foundation."
      ]
    },
    "start": 2023,
    "end": "present",
    "context": {
      "en": "HIGH ATLAS FOUNDATION",
      "fr": "HIGH ATLAS FOUNDATION"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Board participation supporting the High Atlas Foundation’s development mission."
          ],
          "fr": [
            "Participation au conseil au service de la mission de développement de la High Atlas Foundation."
          ]
        }
      },
      {
        "type": "text",
        "body": {
          "en": [
            "Nizzar introduced Web3 fundraising concepts linking digital art, tree planting, community participation and the ability for donors to follow their impact. These were advisory concepts, not claimed implemented outcomes."
          ],
          "fr": [
            "Nizzar a introduit des concepts de collecte Web3 reliant art numérique, plantation d’arbres, participation communautaire et suivi d’impact par les donateurs. Il s’agit de concepts de conseil, pas de résultats présentés comme réalisés."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "hult-prize",
    "title": "HULT PRIZE",
    "aliases": [],
    "era": "institutional-creative-industries",
    "categories": [
      "institutional",
      "business",
      "events"
    ],
    "relationship": "JUDGE",
    "role": {
      "en": "Judge and student mentor",
      "fr": "Membre du jury et mentor étudiant"
    },
    "oneLine": {
      "en": "Judging FSTG Marrakech students and mentoring their marketing strategies.",
      "fr": "Participation au jury des étudiants de la FSTG Marrakech et accompagnement de leurs stratégies marketing."
    },
    "summary": {
      "en": [
        "Judging FSTG Marrakech students and mentoring their marketing strategies."
      ],
      "fr": [
        "Participation au jury des étudiants de la FSTG Marrakech et accompagnement de leurs stratégies marketing."
      ]
    },
    "start": 2019,
    "end": null,
    "context": {
      "en": "HULT PRIZE",
      "fr": "HULT PRIZE"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Judging FSTG Marrakech students and mentoring their marketing strategies."
          ],
          "fr": [
            "Participation au jury des étudiants de la FSTG Marrakech et accompagnement de leurs stratégies marketing."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "water-hackathon",
    "title": "WATER HACKATHON 2019",
    "aliases": [],
    "era": "institutional-creative-industries",
    "categories": [
      "institutional",
      "events",
      "technology"
    ],
    "relationship": "SPEAKER",
    "role": {
      "en": "Master of ceremonies",
      "fr": "Maître de cérémonie"
    },
    "oneLine": {
      "en": "Presenting the projects and winners at the December 2019 water-stress hackathon gala.",
      "fr": "Présentation des projets et des lauréats au gala du hackathon sur le stress hydrique en décembre 2019."
    },
    "summary": {
      "en": [
        "Presenting the projects and winners at the December 2019 water-stress hackathon gala."
      ],
      "fr": [
        "Présentation des projets et des lauréats au gala du hackathon sur le stress hydrique en décembre 2019."
      ]
    },
    "start": 2019,
    "end": 2019,
    "context": {
      "en": "WATER HACKATHON 2019",
      "fr": "WATER HACKATHON 2019"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Presenting the projects and winners at the December 2019 water-stress hackathon gala."
          ],
          "fr": [
            "Présentation des projets et des lauréats au gala du hackathon sur le stress hydrique en décembre 2019."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "arts-dao",
    "title": "ARTS DAO",
    "aliases": [],
    "era": "web3-emerging-tech",
    "categories": [
      "web3",
      "culture",
      "business"
    ],
    "relationship": "BOARD",
    "role": {
      "en": "Founding board member",
      "fr": "Membre fondateur du conseil"
    },
    "oneLine": {
      "en": "Historical founding-board participation in a Web3 art and culture community.",
      "fr": "Participation historique au conseil fondateur d’une communauté d’art et de culture Web3."
    },
    "summary": {
      "en": [
        "Historical founding-board participation in a Web3 art and culture community."
      ],
      "fr": [
        "Participation historique au conseil fondateur d’une communauté d’art et de culture Web3."
      ]
    },
    "start": 2021,
    "end": null,
    "context": {
      "en": "ARTS DAO",
      "fr": "ARTS DAO"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Historical founding-board participation in a Web3 art and culture community."
          ],
          "fr": [
            "Participation historique au conseil fondateur d’une communauté d’art et de culture Web3."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "european-web3-organization",
    "title": "EUROPEAN WEB3 ORGANIZATION",
    "aliases": [],
    "era": "web3-emerging-tech",
    "categories": [
      "web3",
      "institutional",
      "business"
    ],
    "relationship": "BOARD",
    "role": {
      "en": "Member of the management board",
      "fr": "Membre du conseil d’administration"
    },
    "oneLine": {
      "en": "European Web3 ecosystem, narrative, awareness, education and community work.",
      "fr": "Travail sur l’écosystème Web3 européen, son récit, sa sensibilisation, son éducation et sa communauté."
    },
    "summary": {
      "en": [
        "European Web3 ecosystem, narrative, awareness, education and community work."
      ],
      "fr": [
        "Travail sur l’écosystème Web3 européen, son récit, sa sensibilisation, son éducation et sa communauté."
      ]
    },
    "start": 2023,
    "end": "present",
    "context": {
      "en": "EUROPEAN WEB3 ORGANIZATION",
      "fr": "EUROPEAN WEB3 ORGANIZATION"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "European Web3 ecosystem, narrative, awareness, education and community work."
          ],
          "fr": [
            "Travail sur l’écosystème Web3 européen, son récit, sa sensibilisation, son éducation et sa communauté."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "would-jamaa-el-fna",
    "title": "WOULD JAMAA EL FNA",
    "aliases": [],
    "era": "early-creative-editorial",
    "categories": [
      "culture",
      "media"
    ],
    "relationship": "COLLABORATION",
    "role": {
      "en": "Actor · Nasser, directed by Ali Ben Chekroune",
      "fr": "Acteur · Nasser, réalisation Ali Ben Chekroune"
    },
    "oneLine": {
      "en": "An acting credit in the 2016 short film directed by Ali Ben Chekroune; Cannes Short Film Corner history.",
      "fr": "Un rôle dans le court métrage de 2016 réalisé par Ali Ben Chekroune ; parcours au Short Film Corner de Cannes."
    },
    "summary": {
      "en": [
        "An acting credit in the 2016 short film directed by Ali Ben Chekroune; Cannes Short Film Corner history."
      ],
      "fr": [
        "Un rôle dans le court métrage de 2016 réalisé par Ali Ben Chekroune ; parcours au Short Film Corner de Cannes."
      ]
    },
    "start": 2016,
    "end": 2016,
    "context": {
      "en": "WOULD JAMAA EL FNA",
      "fr": "WOULD JAMAA EL FNA"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "An acting credit in the 2016 short film directed by Ali Ben Chekroune; Cannes Short Film Corner history."
          ],
          "fr": [
            "Un rôle dans le court métrage de 2016 réalisé par Ali Ben Chekroune ; parcours au Short Film Corner de Cannes."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "mobile-photography",
    "title": "MOBILE PHOTOGRAPHY",
    "aliases": [],
    "era": "early-creative-editorial",
    "categories": [
      "culture",
      "media"
    ],
    "relationship": "EDITORIAL",
    "role": {
      "en": "Photographer and artist",
      "fr": "Photographe et artiste"
    },
    "oneLine": {
      "en": "Mobile photography and artistic work, documented by The App Whisperer’s 2019 interview.",
      "fr": "Photographie mobile et création artistique, documentées par l’entretien de The App Whisperer en 2019."
    },
    "summary": {
      "en": [
        "Mobile photography and artistic work, documented by The App Whisperer’s 2019 interview."
      ],
      "fr": [
        "Photographie mobile et création artistique, documentées par l’entretien de The App Whisperer en 2019."
      ]
    },
    "start": 2019,
    "end": 2019,
    "context": {
      "en": "MOBILE PHOTOGRAPHY",
      "fr": "MOBILE PHOTOGRAPHY"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [
      "arts-thread-gdgs",
      "nft-liverpool"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Mobile photography and artistic work, documented by The App Whisperer’s 2019 interview."
          ],
          "fr": [
            "Photographie mobile et création artistique, documentées par l’entretien de The App Whisperer en 2019."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "nft-nyc",
    "title": "NFT.NYC",
    "aliases": [],
    "era": "web3-emerging-tech",
    "categories": [
      "web3",
      "events"
    ],
    "relationship": "SPEAKER",
    "role": {
      "en": "Speaker, 2022–2024; Who to Follow listing",
      "fr": "Intervenant, 2022–2024 ; sélection Who to Follow"
    },
    "oneLine": {
      "en": "Conference talks on NFTs, communities and business, including an organizer-published 2024 speaker listing.",
      "fr": "Interventions sur les NFT, les communautés et le business, dont une liste d’intervenants 2024 publiée par l’organisateur."
    },
    "summary": {
      "en": [
        "Conference talks on NFTs, communities and business, including an organizer-published 2024 speaker listing."
      ],
      "fr": [
        "Interventions sur les NFT, les communautés et le business, dont une liste d’intervenants 2024 publiée par l’organisateur."
      ]
    },
    "start": 2022,
    "end": 2024,
    "context": {
      "en": "NFT.NYC",
      "fr": "NFT.NYC"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Conference talks on NFTs, communities and business, including an organizer-published 2024 speaker listing."
          ],
          "fr": [
            "Interventions sur les NFT, les communautés et le business, dont une liste d’intervenants 2024 publiée par l’organisateur."
          ]
        }
      },
      {
        "type": "film",
        "youtube": "_TzA3U88fKU",
        "title": {
          "en": "Raise Funds with NFTs · 2022",
          "fr": "Raise Funds with NFTs · 2022"
        },
        "poster": "nft-nyc-film--tza3u88fku"
      },
      {
        "type": "film",
        "youtube": "qhlmaXIqg1M",
        "title": {
          "en": "IP, Artists, NFTs & AI · 2023",
          "fr": "IP, Artists, NFTs & AI · 2023"
        },
        "poster": "nft-nyc-film-qhlmaxiqg1m"
      },
      {
        "type": "film",
        "youtube": "g45skazOzJE",
        "title": {
          "en": "NFTs, NGOs and fundraising · 2023",
          "fr": "NFTs, NGOs and fundraising · 2023"
        },
        "poster": "nft-nyc-film-g45skazozje"
      },
      {
        "type": "film",
        "youtube": "YuPgr3txQT4",
        "title": {
          "en": "Building healthy inclusion · 2024",
          "fr": "Building healthy inclusion · 2024"
        },
        "poster": "nft-nyc-film-yupgr3txqt4"
      }
    ],
    "credits": [],
    "home": false,
    "cover": "nft-nyc-film--tza3u88fku",
    "gallery": []
  },
  {
    "slug": "nft-liverpool",
    "title": "NFT LIVERPOOL / TIMEPIECES",
    "aliases": [],
    "era": "web3-emerging-tech",
    "categories": [
      "web3",
      "culture",
      "media"
    ],
    "relationship": "EDITORIAL",
    "role": {
      "en": "Selected photography and video artist",
      "fr": "Artiste sélectionné en photographie et vidéo"
    },
    "oneLine": {
      "en": "NFT photography and video selected for NFT Liverpool 2022 by TIME president and TIMEPieces creator Keith Grossman, .",
      "fr": "Photographie et vidéo NFT sélectionnées pour NFT Liverpool 2022 par Keith Grossman, président de TIME et créateur de TIMEPieces, selon le témoignage de Nizzar."
    },
    "summary": {
      "en": [
        "NFT photography and video selected for NFT Liverpool 2022 by TIME president and TIMEPieces creator Keith Grossman, ."
      ],
      "fr": [
        "Photographie et vidéo NFT sélectionnées pour NFT Liverpool 2022 par Keith Grossman, président de TIME et créateur de TIMEPieces, selon le témoignage de Nizzar."
      ]
    },
    "start": 2022,
    "end": 2022,
    "context": {
      "en": "NFT LIVERPOOL / TIMEPIECES",
      "fr": "NFT LIVERPOOL / TIMEPIECES"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [
      "arts-thread-gdgs",
      "mobile-photography"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "NFT photography and video selected for NFT Liverpool 2022 by TIME president and TIMEPieces creator Keith Grossman, ."
          ],
          "fr": [
            "Photographie et vidéo NFT sélectionnées pour NFT Liverpool 2022 par Keith Grossman, président de TIME et créateur de TIMEPieces, selon le témoignage de Nizzar."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "time-web3",
    "title": "TIME · WEB3 RECOGNITION",
    "aliases": [],
    "era": "web3-emerging-tech",
    "categories": [
      "web3",
      "culture"
    ],
    "relationship": "EDITORIAL",
    "role": {
      "en": "recognition · June 2022",
      "fr": "Reconnaissance · juin 2022"
    },
    "oneLine": {
      "en": "selection among TIME’s 100 most influential people in Web3, documented on Nizzar’s channel.",
      "fr": "Sélection parmi les 100 personnes les plus influentes du Web3 de TIME, et documentée sur sa chaîne."
    },
    "summary": {
      "en": [
        "selection among TIME’s 100 most influential people in Web3, documented on Nizzar’s channel."
      ],
      "fr": [
        "Sélection parmi les 100 personnes les plus influentes du Web3 de TIME, et documentée sur sa chaîne."
      ]
    },
    "start": 2022,
    "end": 2022,
    "context": {
      "en": "TIME · WEB3 RECOGNITION",
      "fr": "TIME · WEB3 RECOGNITION"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.linkedin.com/in/nizzar/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "selection among TIME’s 100 most influential people in Web3, documented on Nizzar’s channel."
          ],
          "fr": [
            "Sélection parmi les 100 personnes les plus influentes du Web3 de TIME, et documentée sur sa chaîne."
          ]
        }
      },
      {
        "type": "film",
        "youtube": "hwOZG5TR-r8",
        "title": {
          "en": "TIME · Web3 recognition",
          "fr": "TIME · Web3 recognition"
        },
        "poster": "time-web3-film-hwozg5tr-r8"
      }
    ],
    "credits": [],
    "home": false,
    "cover": "time-web3-film-hwozg5tr-r8",
    "gallery": []
  },
  {
    "slug": "laly-couture",
    "title": "LALY COUTURE",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "media"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "Historical portfolio work",
      "fr": "Travaux du portfolio historique"
    },
    "oneLine": {
      "en": "Work retained in Nizzar’s public historical portfolio, with original visual artifacts.",
      "fr": "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
    },
    "summary": {
      "en": [
        "Work retained in Nizzar’s public historical portfolio, with original visual artifacts."
      ],
      "fr": [
        "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
      ]
    },
    "start": 2018,
    "end": 2019,
    "context": {
      "en": "LALY COUTURE",
      "fr": "LALY COUTURE"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.fiverr.com/nizzar"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Work retained in Nizzar’s public historical portfolio, with original visual artifacts."
          ],
          "fr": [
            "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
          ]
        }
      }
    ],
    "credits": [],
    "cover": "laly-couture-01",
    "gallery": []
  },
  {
    "slug": "lamanche",
    "title": "LAMANCHE",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "media"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "Historical portfolio work",
      "fr": "Travaux du portfolio historique"
    },
    "oneLine": {
      "en": "Work retained in Nizzar’s public historical portfolio, with original visual artifacts.",
      "fr": "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
    },
    "summary": {
      "en": [
        "Work retained in Nizzar’s public historical portfolio, with original visual artifacts."
      ],
      "fr": [
        "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
      ]
    },
    "start": 2021,
    "end": 2021,
    "context": {
      "en": "LAMANCHE",
      "fr": "LAMANCHE"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.fiverr.com/nizzar"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Work retained in Nizzar’s public historical portfolio, with original visual artifacts."
          ],
          "fr": [
            "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
          ]
        }
      },
      {
        "title": {
          "en": "Lamanche · public portfolio evidence",
          "fr": "Lamanche · public portfolio evidence"
        },
        "url": "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/mc8iieutah1cgdld7izn.mp4",
        "media": "lamanche-film",
        "poster": "lamanche-01",
        "type": "film"
      }
    ],
    "credits": [],
    "cover": "lamanche-01",
    "gallery": []
  },
  {
    "slug": "mysticspur",
    "title": "MYSTICSPUR",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "media"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "Historical portfolio work",
      "fr": "Travaux du portfolio historique"
    },
    "oneLine": {
      "en": "Work retained in Nizzar’s public historical portfolio, with original visual artifacts.",
      "fr": "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
    },
    "summary": {
      "en": [
        "Work retained in Nizzar’s public historical portfolio, with original visual artifacts."
      ],
      "fr": [
        "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
      ]
    },
    "start": 2021,
    "end": 2021,
    "context": {
      "en": "MYSTICSPUR",
      "fr": "MYSTICSPUR"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.fiverr.com/nizzar"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Work retained in Nizzar’s public historical portfolio, with original visual artifacts."
          ],
          "fr": [
            "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
          ]
        }
      },
      {
        "title": {
          "en": "MysticSpur · public portfolio evidence",
          "fr": "MysticSpur · public portfolio evidence"
        },
        "url": "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/zk1hx6mgnp5emaonab4r.mp4",
        "media": "mysticspur-film",
        "poster": "mysticspur-01",
        "type": "film"
      }
    ],
    "credits": [],
    "cover": "mysticspur-01",
    "gallery": []
  },
  {
    "slug": "hiya-magazine-paris",
    "title": "HIYA MAGAZINE PARIS",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "media"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "Historical portfolio work",
      "fr": "Travaux du portfolio historique"
    },
    "oneLine": {
      "en": "Work retained in Nizzar’s public historical portfolio, with original visual artifacts.",
      "fr": "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
    },
    "summary": {
      "en": [
        "Work retained in Nizzar’s public historical portfolio, with original visual artifacts."
      ],
      "fr": [
        "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
      ]
    },
    "start": 2020,
    "end": 2020,
    "context": {
      "en": "HIYA MAGAZINE PARIS",
      "fr": "HIYA MAGAZINE PARIS"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.fiverr.com/nizzar"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Work retained in Nizzar’s public historical portfolio, with original visual artifacts."
          ],
          "fr": [
            "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
          ]
        }
      }
    ],
    "credits": [],
    "cover": "hiya-magazine-paris-01",
    "gallery": []
  },
  {
    "slug": "beyond-catstore",
    "title": "BEYOND CATSTORE",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "media"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "Historical portfolio work",
      "fr": "Travaux du portfolio historique"
    },
    "oneLine": {
      "en": "Work retained in Nizzar’s public historical portfolio, with original visual artifacts.",
      "fr": "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
    },
    "summary": {
      "en": [
        "Work retained in Nizzar’s public historical portfolio, with original visual artifacts."
      ],
      "fr": [
        "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
      ]
    },
    "start": 2020,
    "end": 2020,
    "context": {
      "en": "BEYOND CATSTORE",
      "fr": "BEYOND CATSTORE"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.fiverr.com/nizzar"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Work retained in Nizzar’s public historical portfolio, with original visual artifacts."
          ],
          "fr": [
            "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
          ]
        }
      }
    ],
    "credits": [],
    "cover": "beyond-catstore-01",
    "gallery": []
  },
  {
    "slug": "tribalist-africa",
    "title": "TRIBALIST AFRICA",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "media"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "Historical portfolio work",
      "fr": "Travaux du portfolio historique"
    },
    "oneLine": {
      "en": "Work retained in Nizzar’s public historical portfolio, with original visual artifacts.",
      "fr": "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
    },
    "summary": {
      "en": [
        "Work retained in Nizzar’s public historical portfolio, with original visual artifacts."
      ],
      "fr": [
        "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
      ]
    },
    "start": 2019,
    "end": 2019,
    "context": {
      "en": "TRIBALIST AFRICA",
      "fr": "TRIBALIST AFRICA"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.fiverr.com/nizzar"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Work retained in Nizzar’s public historical portfolio, with original visual artifacts."
          ],
          "fr": [
            "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
          ]
        }
      },
      {
        "title": {
          "en": "Tribalist Africa · public portfolio evidence",
          "fr": "Tribalist Africa · public portfolio evidence"
        },
        "url": "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/ketxl2wbcqs9nyoh2bbr.mp4",
        "media": "tribalist-africa-film",
        "poster": "tribalist-africa-01",
        "type": "film"
      }
    ],
    "credits": [],
    "cover": "tribalist-africa-01",
    "gallery": []
  },
  {
    "slug": "jolt-qatar",
    "title": "JOLT QATAR",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "media"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "Historical portfolio work",
      "fr": "Travaux du portfolio historique"
    },
    "oneLine": {
      "en": "Work retained in Nizzar’s public historical portfolio, with original visual artifacts.",
      "fr": "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
    },
    "summary": {
      "en": [
        "Work retained in Nizzar’s public historical portfolio, with original visual artifacts."
      ],
      "fr": [
        "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
      ]
    },
    "start": 2021,
    "end": 2021,
    "context": {
      "en": "JOLT QATAR",
      "fr": "JOLT QATAR"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.fiverr.com/nizzar"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Work retained in Nizzar’s public historical portfolio, with original visual artifacts."
          ],
          "fr": [
            "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
          ]
        }
      }
    ],
    "credits": [],
    "cover": "jolt-qatar-01",
    "gallery": []
  },
  {
    "slug": "lit-action-usa",
    "title": "LIT ACTION USA",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "media"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "Historical portfolio work",
      "fr": "Travaux du portfolio historique"
    },
    "oneLine": {
      "en": "Work retained in Nizzar’s public historical portfolio, with original visual artifacts.",
      "fr": "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
    },
    "summary": {
      "en": [
        "Work retained in Nizzar’s public historical portfolio, with original visual artifacts."
      ],
      "fr": [
        "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
      ]
    },
    "start": 2021,
    "end": 2021,
    "context": {
      "en": "LIT ACTION USA",
      "fr": "LIT ACTION USA"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.fiverr.com/nizzar"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Work retained in Nizzar’s public historical portfolio, with original visual artifacts."
          ],
          "fr": [
            "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
          ]
        }
      }
    ],
    "credits": [],
    "cover": "lit-action-usa-01",
    "gallery": []
  },
  {
    "slug": "doc-hygiene-usa",
    "title": "DOC HYGIENE USA",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "media"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "Historical portfolio work",
      "fr": "Travaux du portfolio historique"
    },
    "oneLine": {
      "en": "Work retained in Nizzar’s public historical portfolio, with original visual artifacts.",
      "fr": "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
    },
    "summary": {
      "en": [
        "Work retained in Nizzar’s public historical portfolio, with original visual artifacts."
      ],
      "fr": [
        "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
      ]
    },
    "start": 2020,
    "end": 2020,
    "context": {
      "en": "DOC HYGIENE USA",
      "fr": "DOC HYGIENE USA"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.fiverr.com/nizzar"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Work retained in Nizzar’s public historical portfolio, with original visual artifacts."
          ],
          "fr": [
            "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
          ]
        }
      }
    ],
    "credits": [],
    "cover": "doc-hygiene-usa-01",
    "gallery": []
  },
  {
    "slug": "moodys-medicinals",
    "title": "MOODY’S MEDICINALS",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "media"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "Historical portfolio work",
      "fr": "Travaux du portfolio historique"
    },
    "oneLine": {
      "en": "Work retained in Nizzar’s public historical portfolio, with original visual artifacts.",
      "fr": "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
    },
    "summary": {
      "en": [
        "Work retained in Nizzar’s public historical portfolio, with original visual artifacts."
      ],
      "fr": [
        "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
      ]
    },
    "start": 2021,
    "end": 2021,
    "context": {
      "en": "MOODY’S MEDICINALS",
      "fr": "MOODY’S MEDICINALS"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.fiverr.com/nizzar"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Work retained in Nizzar’s public historical portfolio, with original visual artifacts."
          ],
          "fr": [
            "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
          ]
        }
      },
      {
        "title": {
          "en": "Moody's Medicinals · public portfolio evidence",
          "fr": "Moody's Medicinals · public portfolio evidence"
        },
        "url": "https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/scboaudf5xbottswm4rd.mp4",
        "media": "moodys-medicinals-film",
        "poster": "moodys-medicinals-01",
        "type": "film"
      }
    ],
    "credits": [],
    "cover": "moodys-medicinals-01",
    "gallery": []
  },
  {
    "slug": "marrakech-poker-open",
    "title": "MARRAKECH POKER OPEN",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "media"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "Historical portfolio work",
      "fr": "Travaux du portfolio historique"
    },
    "oneLine": {
      "en": "Work retained in Nizzar’s public historical portfolio, with original visual artifacts.",
      "fr": "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
    },
    "summary": {
      "en": [
        "Work retained in Nizzar’s public historical portfolio, with original visual artifacts."
      ],
      "fr": [
        "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
      ]
    },
    "start": 2012,
    "end": 2012,
    "context": {
      "en": "MARRAKECH POKER OPEN",
      "fr": "MARRAKECH POKER OPEN"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.fiverr.com/nizzar"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Work retained in Nizzar’s public historical portfolio, with original visual artifacts."
          ],
          "fr": [
            "Travaux conservés dans le portfolio public historique de Nizzar, avec les éléments visuels d’origine."
          ]
        }
      }
    ],
    "credits": [],
    "cover": "marrakech-poker-open-01",
    "gallery": []
  },
  {
    "slug": "ocp",
    "title": "OCP · 1 ŒUVRE, 1 HISTOIRE",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "media"
    ],
    "relationship": "STUDIO CLIENT",
    "role": {
      "en": "Studio contribution · detailed individual credits retained where available",
      "fr": "Contribution du studio · crédits individuels conservés lorsqu’ils sont disponibles"
    },
    "oneLine": {
      "en": "Two mini-documentaries about Mohamed Melehi and Chaïbia, produced with Diptyk for OCP’s art patronage in July 2020.",
      "fr": "Deux mini-documentaires sur Mohamed Melehi et Chaïbia, produits avec Diptyk pour le mécénat artistique d’OCP en juillet 2020."
    },
    "summary": {
      "en": [
        "Two mini-documentaries about Mohamed Melehi and Chaïbia, produced with Diptyk for OCP’s art patronage in July 2020."
      ],
      "fr": [
        "Deux mini-documentaires sur Mohamed Melehi et Chaïbia, produits avec Diptyk pour le mécénat artistique d’OCP en juillet 2020."
      ]
    },
    "start": 2020,
    "end": 2020,
    "context": {
      "en": "OCP · 1 ŒUVRE, 1 HISTOIRE",
      "fr": "OCP · 1 ŒUVRE, 1 HISTOIRE"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.arrozconpollo.studio/ocp"
      }
    ],
    "related": [
      "diptyk",
      "audi-driven-by-art",
      "arroz-con-pollo"
    ],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Two mini-documentaries about Mohamed Melehi and Chaïbia, produced with Diptyk for OCP’s art patronage in July 2020."
          ],
          "fr": [
            "Deux mini-documentaires sur Mohamed Melehi et Chaïbia, produits avec Diptyk pour le mécénat artistique d’OCP en juillet 2020."
          ]
        }
      }
    ],
    "credits": [
      {
        "name": "Nabil Nadifi & Nizzar Ben Chekroune",
        "role": {
          "en": "Creative direction and production",
          "fr": "Direction créative et production"
        }
      },
      {
        "name": "OCP",
        "role": {
          "en": "Courtesy footage and imagery",
          "fr": "Images et séquences fournies"
        }
      }
    ],
    "studio": "arroz-con-pollo",
    "cover": "ocp-01",
    "gallery": []
  },
  {
    "slug": "sergine",
    "title": "SERGINE",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "media"
    ],
    "relationship": "STUDIO CLIENT",
    "role": {
      "en": "Studio contribution · detailed individual credits retained where available",
      "fr": "Contribution du studio · crédits individuels conservés lorsqu’ils sont disponibles"
    },
    "oneLine": {
      "en": "A pilot film and branded multimedia concept for the architecture studio in early 2021.",
      "fr": "Un film pilote et un concept multimédia de marque pour le studio d’architecture début 2021."
    },
    "summary": {
      "en": [
        "A pilot film and branded multimedia concept for the architecture studio in early 2021."
      ],
      "fr": [
        "Un film pilote et un concept multimédia de marque pour le studio d’architecture début 2021."
      ]
    },
    "start": 2021,
    "end": 2021,
    "context": {
      "en": "SERGINE",
      "fr": "SERGINE"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.arrozconpollo.studio/sergine"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "A pilot film and branded multimedia concept for the architecture studio in early 2021."
          ],
          "fr": [
            "Un film pilote et un concept multimédia de marque pour le studio d’architecture début 2021."
          ]
        }
      },
      {
        "type": "gallery",
        "media": [
          "sergine-02",
          "sergine-03",
          "sergine-04"
        ],
        "layout": "grid",
        "title": {
          "en": "From the archive",
          "fr": "Dans les archives"
        }
      }
    ],
    "credits": [
      {
        "name": "Nabil Nadifi",
        "role": {
          "en": "Creative direction",
          "fr": "Direction créative"
        }
      },
      {
        "name": "Simo Bakrim",
        "role": {
          "en": "Filming and editing",
          "fr": "Tournage et montage"
        }
      },
      {
        "name": "Julie Pingree",
        "role": {
          "en": "Narration",
          "fr": "Narration"
        }
      },
      {
        "name": "Arroz Con Pollo",
        "role": {
          "en": "Production and graphic design",
          "fr": "Production et design graphique"
        }
      }
    ],
    "studio": "arroz-con-pollo",
    "cover": "sergine-01",
    "gallery": [
      "sergine-02",
      "sergine-03",
      "sergine-04"
    ]
  },
  {
    "slug": "kleanops",
    "title": "KLEANOPS",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "media"
    ],
    "relationship": "STUDIO CLIENT",
    "role": {
      "en": "Studio contribution · detailed individual credits retained where available",
      "fr": "Contribution du studio · crédits individuels conservés lorsqu’ils sont disponibles"
    },
    "oneLine": {
      "en": "Colourful social content for a hand-sanitizing wipes brand during the pandemic.",
      "fr": "Des contenus sociaux colorés pour une marque de lingettes désinfectantes pendant la pandémie."
    },
    "summary": {
      "en": [
        "Colourful social content for a hand-sanitizing wipes brand during the pandemic."
      ],
      "fr": [
        "Des contenus sociaux colorés pour une marque de lingettes désinfectantes pendant la pandémie."
      ]
    },
    "start": 2020,
    "end": 2020,
    "context": {
      "en": "KLEANOPS",
      "fr": "KLEANOPS"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.arrozconpollo.studio/kleanops"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Colourful social content for a hand-sanitizing wipes brand during the pandemic."
          ],
          "fr": [
            "Des contenus sociaux colorés pour une marque de lingettes désinfectantes pendant la pandémie."
          ]
        }
      },
      {
        "type": "gallery",
        "media": [
          "kleanops-02",
          "kleanops-03",
          "kleanops-04",
          "kleanops-05",
          "kleanops-06",
          "kleanops-07"
        ],
        "layout": "grid",
        "title": {
          "en": "From the archive",
          "fr": "Dans les archives"
        }
      }
    ],
    "credits": [
      {
        "name": "Arroz Con Pollo",
        "role": {
          "en": "Creative studio and production team",
          "fr": "Studio créatif et équipe de production"
        }
      }
    ],
    "studio": "arroz-con-pollo",
    "cover": "kleanops-01",
    "gallery": [
      "kleanops-02",
      "kleanops-03",
      "kleanops-04",
      "kleanops-05",
      "kleanops-06",
      "kleanops-07"
    ]
  },
  {
    "slug": "trnscnd",
    "title": "TRNSCND",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "media"
    ],
    "relationship": "STUDIO CLIENT",
    "role": {
      "en": "Studio contribution · detailed individual credits retained where available",
      "fr": "Contribution du studio · crédits individuels conservés lorsqu’ils sont disponibles"
    },
    "oneLine": {
      "en": "Launch content for a creative strategy and music marketing agency supporting independent artists.",
      "fr": "Contenus de lancement pour une agence de stratégie créative et de marketing musical soutenant les artistes indépendants."
    },
    "summary": {
      "en": [
        "Launch content for a creative strategy and music marketing agency supporting independent artists."
      ],
      "fr": [
        "Contenus de lancement pour une agence de stratégie créative et de marketing musical soutenant les artistes indépendants."
      ]
    },
    "start": 2020,
    "end": 2020,
    "context": {
      "en": "TRNSCND",
      "fr": "TRNSCND"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.arrozconpollo.studio/trnscnd"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Launch content for a creative strategy and music marketing agency supporting independent artists."
          ],
          "fr": [
            "Contenus de lancement pour une agence de stratégie créative et de marketing musical soutenant les artistes indépendants."
          ]
        }
      },
      {
        "type": "gallery",
        "media": [
          "trnscnd-02",
          "trnscnd-03",
          "trnscnd-04",
          "trnscnd-05",
          "trnscnd-06",
          "trnscnd-07"
        ],
        "layout": "grid",
        "title": {
          "en": "From the archive",
          "fr": "Dans les archives"
        }
      }
    ],
    "credits": [
      {
        "name": "Arroz Con Pollo",
        "role": {
          "en": "Creative studio and production team",
          "fr": "Studio créatif et équipe de production"
        }
      }
    ],
    "studio": "arroz-con-pollo",
    "cover": "trnscnd-01",
    "gallery": [
      "trnscnd-02",
      "trnscnd-03",
      "trnscnd-04",
      "trnscnd-05",
      "trnscnd-06",
      "trnscnd-07"
    ]
  },
  {
    "slug": "wow-protein-donuts",
    "title": "WOW! PROTEIN DONUTS",
    "aliases": [],
    "era": "brand-digital-experience",
    "categories": [
      "brand",
      "media"
    ],
    "relationship": "STUDIO CLIENT",
    "role": {
      "en": "Studio contribution · detailed individual credits retained where available",
      "fr": "Contribution du studio · crédits individuels conservés lorsqu’ils sont disponibles"
    },
    "oneLine": {
      "en": "Content for the brand’s 2021 rebrand.",
      "fr": "Contenus pour la refonte de marque en 2021."
    },
    "summary": {
      "en": [
        "Content for the brand’s 2021 rebrand."
      ],
      "fr": [
        "Contenus pour la refonte de marque en 2021."
      ]
    },
    "start": 2021,
    "end": 2021,
    "context": {
      "en": "WOW! PROTEIN DONUTS",
      "fr": "WOW! PROTEIN DONUTS"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.arrozconpollo.studio/wow"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Content for the brand’s 2021 rebrand."
          ],
          "fr": [
            "Contenus pour la refonte de marque en 2021."
          ]
        }
      },
      {
        "type": "gallery",
        "media": [
          "wow-protein-donuts-02",
          "wow-protein-donuts-03",
          "wow-protein-donuts-04",
          "wow-protein-donuts-05",
          "wow-protein-donuts-06",
          "wow-protein-donuts-07"
        ],
        "layout": "grid",
        "title": {
          "en": "From the archive",
          "fr": "Dans les archives"
        }
      }
    ],
    "credits": [
      {
        "name": "Arroz Con Pollo",
        "role": {
          "en": "Creative studio and production team",
          "fr": "Studio créatif et équipe de production"
        }
      }
    ],
    "studio": "arroz-con-pollo",
    "cover": "wow-protein-donuts-01",
    "gallery": [
      "wow-protein-donuts-02",
      "wow-protein-donuts-03",
      "wow-protein-donuts-04",
      "wow-protein-donuts-05",
      "wow-protein-donuts-06",
      "wow-protein-donuts-07"
    ]
  },
  {
    "slug": "harvest-festival",
    "title": "HIGH ATLAS HARVEST FESTIVAL",
    "aliases": [],
    "era": "culture-media",
    "categories": [
      "culture",
      "editorial",
      "media"
    ],
    "relationship": "STUDIO RECORD",
    "role": {
      "en": "Studio archive; individual participation not established",
      "fr": "Archives du studio ; participation individuelle non établie"
    },
    "oneLine": {
      "en": "Studio visual assets for the Global Diversity Foundation’s 2022 festival; Nizzar’s individual participation is not documented.",
      "fr": "Supports visuels du studio pour le festival 2022 de la Global Diversity Foundation ; participation individuelle de Nizzar non documentée."
    },
    "summary": {
      "en": [
        "Studio visual assets for the Global Diversity Foundation’s 2022 festival; Nizzar’s individual participation is not documented."
      ],
      "fr": [
        "Supports visuels du studio pour le festival 2022 de la Global Diversity Foundation ; participation individuelle de Nizzar non documentée."
      ]
    },
    "start": 2022,
    "end": 2022,
    "context": {
      "en": "HIGH ATLAS HARVEST FESTIVAL",
      "fr": "HIGH ATLAS HARVEST FESTIVAL"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.arrozconpollo.studio/harvestfestival"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "Studio visual assets for the Global Diversity Foundation’s 2022 festival; Nizzar’s individual participation is not documented."
          ],
          "fr": [
            "Supports visuels du studio pour le festival 2022 de la Global Diversity Foundation ; participation individuelle de Nizzar non documentée."
          ]
        }
      },
      {
        "type": "gallery",
        "media": [
          "harvest-festival-03",
          "harvest-festival-04",
          "harvest-festival-05",
          "harvest-festival-06",
          "harvest-festival-07",
          "harvest-festival-08"
        ],
        "layout": "grid",
        "title": {
          "en": "From the archive",
          "fr": "Dans les archives"
        }
      }
    ],
    "credits": [
      {
        "name": "Arroz Con Pollo",
        "role": {
          "en": "Creative studio and production team",
          "fr": "Studio créatif et équipe de production"
        }
      }
    ],
    "studio": "arroz-con-pollo",
    "cover": "harvest-festival-02",
    "gallery": [
      "harvest-festival-03",
      "harvest-festival-04",
      "harvest-festival-05",
      "harvest-festival-06",
      "harvest-festival-07",
      "harvest-festival-08"
    ],
    "listed": true,
    "ownerParticipation": false
  },
  {
    "slug": "qisas-rbati",
    "title": "QISAS RBATI",
    "aliases": [],
    "era": "culture-media",
    "categories": [
      "culture",
      "editorial",
      "media"
    ],
    "relationship": "STUDIO RECORD",
    "role": {
      "en": "Studio archive; individual participation not established",
      "fr": "Archives du studio ; participation individuelle non établie"
    },
    "oneLine": {
      "en": "A studio podcast for the Foundation for the Safeguarding of Rabat’s Cultural Heritage; Nizzar’s individual participation is not documented.",
      "fr": "Un podcast du studio pour la Fondation pour la sauvegarde du patrimoine culturel de Rabat ; participation individuelle de Nizzar non documentée."
    },
    "summary": {
      "en": [
        "A studio podcast for the Foundation for the Safeguarding of Rabat’s Cultural Heritage; Nizzar’s individual participation is not documented."
      ],
      "fr": [
        "Un podcast du studio pour la Fondation pour la sauvegarde du patrimoine culturel de Rabat ; participation individuelle de Nizzar non documentée."
      ]
    },
    "start": 2020,
    "end": 2020,
    "context": {
      "en": "QISAS RBATI",
      "fr": "QISAS RBATI"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://www.arrozconpollo.studio/qisasrbati"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "A studio podcast for the Foundation for the Safeguarding of Rabat’s Cultural Heritage; Nizzar’s individual participation is not documented."
          ],
          "fr": [
            "Un podcast du studio pour la Fondation pour la sauvegarde du patrimoine culturel de Rabat ; participation individuelle de Nizzar non documentée."
          ]
        }
      },
      {
        "type": "gallery",
        "media": [
          "qisas-rbati-03",
          "qisas-rbati-04",
          "qisas-rbati-05"
        ],
        "layout": "grid",
        "title": {
          "en": "From the archive",
          "fr": "Dans les archives"
        }
      }
    ],
    "credits": [
      {
        "name": "Arroz Con Pollo",
        "role": {
          "en": "Creative studio and production team",
          "fr": "Studio créatif et équipe de production"
        }
      }
    ],
    "studio": "arroz-con-pollo",
    "cover": "qisas-rbati-02",
    "gallery": [
      "qisas-rbati-03",
      "qisas-rbati-04",
      "qisas-rbati-05"
    ],
    "listed": true,
    "ownerParticipation": false
  },
  {
    "slug": "3kool",
    "title": "3KOOL",
    "aliases": [],
    "era": "web3-emerging-tech",
    "categories": [
      "web3",
      "brand",
      "business"
    ],
    "relationship": "FOUNDER",
    "role": {
      "en": "Founder",
      "fr": "Fondateur"
    },
    "oneLine": {
      "en": "A Web3 KOL marketing practice documented on its public founder page. The page’s collective project list is retained as agency context in the source register.",
      "fr": "Une pratique de marketing KOL Web3 documentée sur sa page publique de fondateur. La liste collective de projets est conservée comme contexte de l’agence dans le registre des sources."
    },
    "summary": {
      "en": [
        "A Web3 KOL marketing practice documented on its public founder page. The page’s collective project list is retained as agency context in the source register."
      ],
      "fr": [
        "Une pratique de marketing KOL Web3 documentée sur sa page publique de fondateur. La liste collective de projets est conservée comme contexte de l’agence dans le registre des sources."
      ]
    },
    "start": 2024,
    "end": 2024,
    "context": {
      "en": "3KOOL",
      "fr": "3KOOL"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://3kool.io/"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "A Web3 KOL marketing practice documented on its public founder page. The page’s collective project list is retained as agency context in the source register."
          ],
          "fr": [
            "Une pratique de marketing KOL Web3 documentée sur sa page publique de fondateur. La liste collective de projets est conservée comme contexte de l’agence dans le registre des sources."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "anderson-silva",
    "title": "ANDERSON SILVA",
    "aliases": [],
    "era": "web3-emerging-tech",
    "categories": [
      "web3",
      "culture"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "professional association",
      "fr": "Relation professionnelle"
    },
    "oneLine": {
      "en": "An professional association; the exact engagement scope remains to be documented in this archive.",
      "fr": "Une relation professionnelle ; le périmètre exact reste à documenter dans ces archives."
    },
    "summary": {
      "en": [
        "An professional association; the exact engagement scope remains to be documented in this archive."
      ],
      "fr": [
        "Une relation professionnelle ; le périmètre exact reste à documenter dans ces archives."
      ]
    },
    "start": 2024,
    "end": 2024,
    "context": {
      "en": "ANDERSON SILVA",
      "fr": "ANDERSON SILVA"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://nizzar.com/about"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "An professional association; the exact engagement scope remains to be documented in this archive."
          ],
          "fr": [
            "Une relation professionnelle ; le périmètre exact reste à documenter dans ces archives."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "charly-palmer",
    "title": "CHARLY PALMER",
    "aliases": [],
    "era": "web3-emerging-tech",
    "categories": [
      "web3",
      "culture"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "professional association",
      "fr": "Relation professionnelle"
    },
    "oneLine": {
      "en": "An professional association; the exact engagement scope remains to be documented in this archive.",
      "fr": "Une relation professionnelle ; le périmètre exact reste à documenter dans ces archives."
    },
    "summary": {
      "en": [
        "An professional association; the exact engagement scope remains to be documented in this archive."
      ],
      "fr": [
        "Une relation professionnelle ; le périmètre exact reste à documenter dans ces archives."
      ]
    },
    "start": 2021,
    "end": null,
    "context": {
      "en": "CHARLY PALMER",
      "fr": "CHARLY PALMER"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://nizzar.com/about"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "An professional association; the exact engagement scope remains to be documented in this archive."
          ],
          "fr": [
            "Une relation professionnelle ; le périmètre exact reste à documenter dans ces archives."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "red-cross",
    "title": "RED CROSS / ICRC",
    "aliases": [],
    "era": "institutional-creative-industries",
    "categories": [
      "institutional"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "professional association",
      "fr": "Relation professionnelle"
    },
    "oneLine": {
      "en": "An professional association; the exact engagement scope remains to be documented in this archive.",
      "fr": "Une relation professionnelle ; le périmètre exact reste à documenter dans ces archives."
    },
    "summary": {
      "en": [
        "An professional association; the exact engagement scope remains to be documented in this archive."
      ],
      "fr": [
        "Une relation professionnelle ; le périmètre exact reste à documenter dans ces archives."
      ]
    },
    "start": 2023,
    "end": 2023,
    "context": {
      "en": "RED CROSS / ICRC",
      "fr": "RED CROSS / ICRC"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://nizzar.com/about"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "An professional association; the exact engagement scope remains to be documented in this archive."
          ],
          "fr": [
            "Une relation professionnelle ; le périmètre exact reste à documenter dans ces archives."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "who",
    "title": "WORLD HEALTH ORGANIZATION",
    "aliases": [],
    "era": "institutional-creative-industries",
    "categories": [
      "institutional"
    ],
    "relationship": "ENGAGEMENT",
    "role": {
      "en": "professional association",
      "fr": "Relation professionnelle"
    },
    "oneLine": {
      "en": "An professional association; the exact engagement scope remains to be documented in this archive.",
      "fr": "Une relation professionnelle ; le périmètre exact reste à documenter dans ces archives."
    },
    "summary": {
      "en": [
        "An professional association; the exact engagement scope remains to be documented in this archive."
      ],
      "fr": [
        "Une relation professionnelle ; le périmètre exact reste à documenter dans ces archives."
      ]
    },
    "start": 2020,
    "end": 2020,
    "context": {
      "en": "WORLD HEALTH ORGANIZATION",
      "fr": "WORLD HEALTH ORGANIZATION"
    },
    "sources": [
      {
        "label": {
          "en": "Professional record",
          "fr": "Parcours professionnel"
        },
        "url": "https://nizzar.com/about"
      }
    ],
    "related": [],
    "blocks": [
      {
        "type": "text",
        "body": {
          "en": [
            "An professional association; the exact engagement scope remains to be documented in this archive."
          ],
          "fr": [
            "Une relation professionnelle ; le périmètre exact reste à documenter dans ces archives."
          ]
        }
      }
    ],
    "credits": [],
    "cover": null,
    "gallery": []
  },
  {
    "slug": "tv5-monde",
    "title": "TV5 Monde",
    "aliases": [
      "TV5"
    ],
    "era": "culture-media",
    "categories": [
      "media",
      "editorial"
    ],
    "relationship": "MEDIA APPEARANCE",
    "role": {
      "en": "Documentary appearance",
      "fr": "Participation à un documentaire"
    },
    "oneLine": {
      "en": "Featured in a television documentary by TV5.",
      "fr": "Apparition dans un documentaire télévisé de TV5."
    },
    "summary": {
      "en": [
        "I appeared in a television documentary by TV5."
      ],
      "fr": [
        "J’ai participé à un documentaire télévisé de TV5."
      ]
    },
    "start": 2022,
    "end": 2022,
    "context": {
      "en": "Television documentary",
      "fr": "Documentaire télévisé"
    },
    "sources": [],
    "related": [
      "nft-nyc",
      "time-web3"
    ],
    "blocks": [
      {
        "type": "text",
        "title": {
          "en": "Documentary appearance",
          "fr": "Participation documentaire"
        },
        "body": {
          "en": [
            "I appeared in a television documentary by TV5."
          ],
          "fr": [
            "J’ai participé à un documentaire télévisé de TV5."
          ]
        }
      }
    ],
    "credits": [],
    "listed": true,
    "ownerParticipation": true
  }
];
