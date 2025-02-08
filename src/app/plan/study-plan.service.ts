import { Injectable } from '@angular/core';

export interface Subtopic {
  title: string;
  content: {
    explanation: string;
    resources?: any;
    activities?: string[];
    examples?: string[];
  };
}


export interface Topic {
  title: string;
  subtopics: Subtopic[];
}


export interface Section {
  id: string;
  title: string;
  topics: Topic[];
}


export interface StudyPlan {
  planTitle: string;
  sections: Section[];
}

@Injectable({
  providedIn: 'root',
})
export class StudyPlanService {
  private studyPlan = {
    planTitle: "🎵Plan de Estudios Producción Musical",
    sections: [
      {
        id: "fundamentals",
        title: "Fundamentos de Producción Musical (2-3 semanas)",
        topics: [
          {
            title: "Dominio de FL Studio",
            subtopics: [
              {
                title: "Configuración inicial profesional",
                content: {
                  explanation: "Configuración avanzada de audio/MIDI: Driver ASIO, buffer size (256-512 samples), perfil MIDI para controladores. Personalización de atajos esenciales (Ctrl+B para pintar, Ctrl+L para lanzador).",
                  resources: {
                    wikipedia: [
                      { name: "FL Studio", url: "https://es.wikipedia.org/wiki/FL_Studio" }
                    ],
                    youtube: [
                      { name: "Configuración FL Studio 21", url: "https://youtu.be/H8Dz3GzO3Y4" }
                    ],
                    web: [
                      { name: "Guía oficial Image-Line", url: "https://www.image-line.com/fl-studio-learning/" }
                    ]
                  },
                  activities: [
                    "Crear plantilla con buses: Kick, Bass, Leads, FX",
                    "Configurar estructura de carpetas: Samples > Kicks, Snares, Hi-Hats"
                  ]
                }
              },
              {
                title: "Flujo de trabajo avanzado",
                content: {
                  explanation: "Organización de proyectos: Convención de nombres profesional (Ej: 'Kick_909_Compressed'), sistema de colores por categoría, gestión de patrones y playlist.",
                  resources: {
                    youtube: [
                      { name: "Workflow profesional", url: "https://youtu.be/9gQZ4lWv0l0" }
                    ]
                  },
                  activities: [
                    "Implementar color coding: Rojo=Kick, Azul=Bass",
                    "Practicar combinación de teclas: Ctrl+B, Ctrl+T"
                  ]
                }
              }
            ]
          },
          {
            title: "Teoría Musical Aplicada",
            subtopics: [
              {
                title: "Escalas y progresiones armónicas",
                content: {
                  explanation: "Escalas mayores/menores aplicadas al House. Progresiones comunes: I-V-vi-IV (C-G-Am-F). Tensiones armónicas (7mas, 9nas).",
                  resources: {
                    wikipedia: [
                      { name: "Progresión de acordes", url: "https://es.wikipedia.org/wiki/Progresi%C3%B3n_de_acordes" }
                    ]
                  },
                  activities: [
                    "Crear progresión de 8 compases en C Mayor",
                    "Armonizar melodía con acordes de 7ma"
                  ],
                  examples: [
                    "Avicii - Levels (A♭-Fm-D♭-E♭)",
                    "Daft Punk - Digital Love (Bm-D-A-E)"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "synthesis",
        title: "Síntesis con Vital (3-4 semanas)",
        topics: [
          {
            title: "Dominio de Vital",
            subtopics: [
              {
                title: "Arquitectura del sintetizador",
                content: {
                  explanation: "Osciladores (WaveTable, Noise, Sub), Filtros (Multimode, Comb), Modulación (LFOs, Envelopes, Macros).",
                  resources: {
                    youtube: [
                      { name: "Tutorial Vital", url: "https://youtu.be/13X13X13X13X" }
                    ]
                  },
                  activities: [
                    "Recrear bajo estilo UK Garage",
                    "Diseñar pad atmosférico con 3 osciladores"
                  ]
                }
              },
              {
                title: "Tipos de Onda",
                content: {
                  explanation: "Diferentes formas de onda: Senoidal, Cuadrada, Triangular, Diente de Sierra. Características y usos en síntesis.",
                  resources: {
                    wikipedia: [
                      { name: "Forma de onda", url: "https://es.wikipedia.org/wiki/Forma_de_onda" }
                    ]
                  },
                  activities: [
                    "Crear diferentes sonidos utilizando cada tipo de onda",
                    "Analizar el espectro de frecuencias de cada forma de onda"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "structure",
        title: "Estructura Musical (4-5 semanas)",
        topics: [
          {
            title: "Arquitectura de Track",
            subtopics: [
              {
                title: "Estructura clásica de House",
                content: {
                  explanation: "Formato AABA: Intro (16 compases), Build-Up (8), Drop (32), Break (16), Outro (16). Elementos de transición (risers, impacts).",
                  activities: [
                    "Analizar estructura de 'One More Time' (Daft Punk)",
                    "Crear mapa de tensión/energía"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "mixing",
        title: "Mezcla Profesional (4 semanas)",
        topics: [
          {
            title: "Técnicas Avanzadas",
            subtopics: [
              {
                title: "Balance espectral",
                content: {
                  explanation: "Pirámide de frecuencias: Subs (20-60Hz), Low-Mids (200-500Hz), Highs (8-20kHz). Técnica 'Carving EQ'.",
                  activities: [
                    "Aplicar sidechain con Fruity Limiter",
                    "Crear cadena de efectos para percusión"
                  ]
                }
              },
              {
                title: "Compresores",
                content: {
                  explanation: "Uso de compresores para controlar la dinámica: ataque, liberación, umbral y relación de compresión.",
                  resources: {
                    wikipedia: [
                      { name: "Compresor (audio)", url: "https://es.wikipedia.org/wiki/Compresor_(audio)" }
                    ]
                  },
                  activities: [
                    "Aplicar compresión en una pista de voz",
                    "Comparar diferentes tipos de compresores: VCA, FET, Opto"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "genres",
        title: "Exploración de Géneros (6-8 semanas)",
        topics: [
          {
            title: "Deep House",
            subtopics: [
              {
                title: "Elementos característicos",
                content: {
                  explanation: "Bajos subsónicos (30-80Hz), pads con movimiento lento, percusión orgánica (shakers, congas), tempo 118-122 BPM.",
                  activities: [
                    "Crear loop con bajo Moog-style",
                    "Diseñar pad con LFO en cutoff"
                  ],
                  examples: [
                    "Disclosure - Latch",
                    "Kerri Chandler - Atmospheric Beats"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "final-projects",
        title: "Proyectos Finales (6 semanas)",
        topics: [
          {
            title: "Producción de EP",
            subtopics: [
              {
                title: "Desarrollo de identidad sonora",
                content: {
                  explanation: "Creación de 3-5 tracks coherentes con elementos recurrentes y paleta sonora consistente.",
                  activities: [
                    "Producir track principal con estructura completa",
                    "Crear versión radio edit y extended mix"
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "sampling",
        title: "Técnicas de Sampling",
        topics: [
          {
            title: "Introducción al Sampling",
            subtopics: [
              {
                title: "Conceptos básicos de Sampling",
                content: {
                  explanation: "Exploración de las técnicas de sampling, desde la captura de sonidos hasta su procesamiento y manipulación en la producción musical. Técnicas como la selección de muestras, la manipulación de tiempo y tono, y la creatividad al integrar samples en la música.",
                  resources: {
                    wikipedia: [
                      { name: "Sampling (música)", url: "https://es.wikipedia.org/wiki/Sampling_(m%C3%BAsica)" }
                    ],
                    web: [
                      { name: "Guía de Sampling en producción musical", url: "https://www.izotope.com/en/learn/understanding-chords-and-scales-in-music-production.html" }
                    ]
                  },
                  activities: [
                    "Crear un beat utilizando un sample de una canción (respetando derechos de autor o utilizando muestras libres de derechos)",
                    "Experimentar con la manipulación de un sample: cambiar su pitch, tempo y aplicar efectos."
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        id: "sound-selection",
        title: "Selección de Sonido en Producción Musical",
        topics: [
          {
            title: "Selección de Sonidos y Samples",
            subtopics: [
              {
                title: "Eligiendo los sonidos adecuados",
                content: {
                  explanation: "La importancia de elegir los sonidos correctos para cada proyecto. Técnicas para seleccionar samples, sintetizadores y efectos que complementen la visión creativa y el género musical. Cómo reconocer la calidad de un sonido y su impacto en la mezcla final.",
                  resources: {
                    web: [
                      { name: "Selección de sonidos en la producción musical", url: "https://www.attackmagazine.com/production/production-techniques/sound-selection-the-most-important-part-of-your-production/" },
                      { name: "Cómo seleccionar sonidos para la mezcla", url: "https://www.soundonsound.com/techniques/sound-selection" }
                    ]
                  },
                  activities: [
                    "Escuchar diferentes muestras de sonidos y elegir los más adecuados para una canción específica.",
                    "Crear una lista de sonidos favoritos (samples, sintetizadores) y organizarlos por categorías: Bass, Percusión, Leads, Pads, etc."
                  ]
                }
              }
            ]
          }
        ]
      }
    ]
  };

  getPlan(): StudyPlan {
    return this.studyPlan;
  }
}
