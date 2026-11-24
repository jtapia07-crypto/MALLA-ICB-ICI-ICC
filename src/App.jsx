import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  CheckCircle2,
  Circle,
  Lock,
  BookOpen,
  Award,
  AlertTriangle,
  Info,
  Filter,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Layers,
  GraduationCap,
  Sparkles,
  Calendar,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  SlidersHorizontal,
  Share2,
  Download,
  Building2,
  Factory,
  FlaskConical,
  HardHat
} from 'lucide-react';

/**
 * DATOS REALES DE LAS MALLAS CURRICULARES UFRO (330 SCT CADA UNA)
 * 1. Ingeniería Civil (Código 30094)
 * 2. Ingeniería Civil Industrial (Código 30013 - Act. Dic 2025)
 * 3. Ingeniería Civil en Biotecnología (Código 30090 - Act. Dic 2025)
 */

// ==================== 1. INGENIERÍA CIVIL (CÓDIGO 30094) ====================
const CIVIL_CURRICULUM = [
  // NIVEL 1 (PRIMER AÑO)
  { code: 'IME025', name: 'Introducción al Cálculo', level: 1, year: 1, sct: 6, area: 'Ciencias Básicas', prereqs: [] },
  { code: 'IME026', name: 'Introducción al Álgebra', level: 1, year: 1, sct: 6, area: 'Ciencias Básicas', prereqs: [] },
  { code: 'ICQ060', name: 'Química General', level: 1, year: 1, sct: 6, area: 'Ciencias Básicas', prereqs: [] },
  { code: 'DII100', name: 'Taller de Introducción a la Ingeniería', level: 1, year: 1, sct: 6, area: 'Ingeniería Aplicada', prereqs: [] },
  { code: 'DII101', name: 'Habilidades Comunicativas para Ingeniería', level: 1, year: 1, sct: 4, area: 'Formación General', prereqs: [] },
  { code: 'I94401', name: 'Electivo de Formación General I', level: 1, year: 1, sct: 2, area: 'Formación General', prereqs: [] },
  // NIVEL 2
  { code: 'IME056', name: 'Cálculo en Una Variable', level: 2, year: 1, sct: 6, area: 'Ciencias Básicas', prereqs: ['IME025'] },
  { code: 'IME057', name: 'Álgebra Lineal', level: 2, year: 1, sct: 6, area: 'Ciencias Básicas', prereqs: ['IME026'] },
  { code: 'ICF064', name: 'Física Mecánica', level: 2, year: 1, sct: 6, area: 'Ciencias Básicas', prereqs: ['IME025', 'IME026'] },
  { code: 'ICC157', name: 'Programación para Ingeniería', level: 2, year: 1, sct: 6, area: 'Ingeniería Aplicada', prereqs: ['IME026'] },
  { code: 'IOC100', name: 'Introducción a la Ingeniería Civil', level: 2, year: 1, sct: 4, area: 'Ingeniería Aplicada', prereqs: ['DII100'] },
  { code: 'I94402', name: 'Electivo de Formación General II', level: 2, year: 1, sct: 2, area: 'Formación General', prereqs: [] },
  // NIVEL 3
  { code: 'IME102', name: 'Cálculo Multivariable', level: 3, year: 2, sct: 6, area: 'Ciencias Básicas', prereqs: ['IME056', 'IME057'] },
  { code: 'IME103', name: 'Ecuaciones Diferenciales', level: 3, year: 2, sct: 6, area: 'Ciencias Básicas', prereqs: ['IME056', 'IME057'] },
  { code: 'ICF114', name: 'Electromagnetismo', level: 3, year: 2, sct: 6, area: 'Ciencias Básicas', prereqs: ['IME056', 'ICF064'] },
  { code: 'IOC200', name: 'Estática', level: 3, year: 2, sct: 6, area: 'Estructuras y Geotecnia', prereqs: ['ICF064', 'IME056'] },
  { code: 'IOC201', name: 'Expresión Gráfica y Topografía', level: 3, year: 2, sct: 6, area: 'Ingeniería Aplicada', prereqs: ['IOC100'] },
  // NIVEL 4
  { code: 'IME153', name: 'Probabilidades y Estadística', level: 4, year: 2, sct: 6, area: 'Ciencias Básicas', prereqs: ['IME102'] },
  { code: 'IME154', name: 'Métodos Numéricos', level: 4, year: 2, sct: 5, area: 'Ciencias Básicas', prereqs: ['IME103', 'ICC157'] },
  { code: 'ICF164', name: 'Termodinámica y Ondas', level: 4, year: 2, sct: 6, area: 'Ciencias Básicas', prereqs: ['IME102', 'ICF114'] },
  { code: 'IOC250', name: 'Mecánica de Sólidos', level: 4, year: 2, sct: 6, area: 'Estructuras y Geotecnia', prereqs: ['IOC200', 'IME103'] },
  { code: 'IOC251', name: 'Materiales de Construcción', level: 4, year: 2, sct: 5, area: 'Estructuras y Geotecnia', prereqs: ['ICQ060', 'IOC200'] },
  { code: 'I94403', name: 'Electivo de Formación General III', level: 4, year: 2, sct: 2, area: 'Formación General', prereqs: [] },
  // NIVEL 5
  { code: 'IOC300', name: 'Análisis Estructural I', level: 5, year: 3, sct: 6, area: 'Estructuras y Geotecnia', prereqs: ['IOC250'] },
  { code: 'IOC301', name: 'Mecánica de Fluidos', level: 5, year: 3, sct: 6, area: 'Hidráulica y Transporte', prereqs: ['IME103', 'ICF164'] },
  { code: 'IOC302', name: 'Geología para Ingeniería', level: 5, year: 3, sct: 5, area: 'Estructuras y Geotecnia', prereqs: ['IOC201', 'ICQ060'] },
  { code: 'DII300', name: 'Economía y Finanzas', level: 5, year: 3, sct: 5, area: 'Gestión y Electivos', prereqs: ['IME102'] },
  { code: 'IOC303', name: 'Taller de Diseño en Ingeniería Civil I', level: 5, year: 3, sct: 6, area: 'Ingeniería Aplicada', prereqs: ['IOC201', 'IOC251'] },
  { code: 'I94404', name: 'Electivo de Formación General IV', level: 5, year: 3, sct: 2, area: 'Formación General', prereqs: [] },
  // NIVEL 6
  { code: 'IOC350', name: 'Análisis Estructural II', level: 6, year: 3, sct: 6, area: 'Estructuras y Geotecnia', prereqs: ['IOC300', 'IME154'] },
  { code: 'IOC351', name: 'Hidráulica', level: 6, year: 3, sct: 6, area: 'Hidráulica y Transporte', prereqs: ['IOC301'] },
  { code: 'IOC352', name: 'Mecánica de Suelos I', level: 6, year: 3, sct: 6, area: 'Estructuras y Geotecnia', prereqs: ['IOC250', 'IOC302'] },
  { code: 'IOC353', name: 'Ingeniería de Transporte', level: 6, year: 3, sct: 6, area: 'Hidráulica y Transporte', prereqs: ['IME153', 'IOC201'] },
  { code: 'DII350', name: 'Administración y Gestión de Proyectos', level: 6, year: 3, sct: 6, area: 'Gestión y Electivos', prereqs: ['DII300'] },
  // NIVEL 7
  { code: 'IOC400', name: 'Diseño en Hormigón Armado', level: 7, year: 4, sct: 6, area: 'Estructuras y Geotecnia', prereqs: ['IOC350', 'IOC251'] },
  { code: 'IOC401', name: 'Hidrología', level: 7, year: 4, sct: 6, area: 'Hidráulica y Transporte', prereqs: ['IOC351', 'IME153'] },
  { code: 'IOC402', name: 'Mecánica de Suelos II', level: 7, year: 4, sct: 6, area: 'Estructuras y Geotecnia', prereqs: ['IOC352'] },
  { code: 'IOC403', name: 'Diseño Vial y Pavimentos', level: 7, year: 4, sct: 6, area: 'Hidráulica y Transporte', prereqs: ['IOC353', 'IOC352'] },
  { code: 'IOC404', name: 'Tecnología y Gestión de la Construcción', level: 7, year: 4, sct: 6, area: 'Gestión y Electivos', prereqs: ['IOC303', 'DII350'] },
  // NIVEL 8
  { code: 'IOC450', name: 'Diseño en Acero y Madera', level: 8, year: 4, sct: 6, area: 'Estructuras y Geotecnia', prereqs: ['IOC350'] },
  { code: 'IOC451', name: 'Ingeniería Sanitaria y Ambiental', level: 8, year: 4, sct: 6, area: 'Hidráulica y Transporte', prereqs: ['IOC351', 'ICQ060'] },
  { code: 'IOC452', name: 'Ingeniería de Fundaciones', level: 8, year: 4, sct: 6, area: 'Estructuras y Geotecnia', prereqs: ['IOC400', 'IOC402'] },
  { code: 'IOC453', name: 'Taller de Diseño en Ingeniería Civil II', level: 8, year: 4, sct: 6, area: 'Ingeniería Aplicada', prereqs: ['IOC400', 'IOC401', 'IOC403'] },
  { code: 'DII450', name: 'Evaluación de Proyectos', level: 8, year: 4, sct: 6, area: 'Gestión y Electivos', prereqs: ['DII350', 'IME153'] },
  // NIVEL 9
  { code: 'IOC500', name: 'Ingeniería Sísmica', level: 9, year: 5, sct: 6, area: 'Estructuras y Geotecnia', prereqs: ['IOC400', 'IOC450'] },
  { code: 'IOC501', name: 'Obras Hidráulicas', level: 9, year: 5, sct: 6, area: 'Hidráulica y Transporte', prereqs: ['IOC401', 'IOC451'] },
  { code: 'IOC502', name: 'Planificación y Control de Obras', level: 9, year: 5, sct: 6, area: 'Gestión y Electivos', prereqs: ['IOC404', 'DII450'] },
  { code: 'IOC503', name: 'Electivo de Especialidad I', level: 9, year: 5, sct: 6, area: 'Gestión y Electivos', prereqs: ['IOC453'] },
  { code: 'IOC504', name: 'Electivo de Especialidad II', level: 9, year: 5, sct: 6, area: 'Gestión y Electivos', prereqs: ['IOC453'] },
  // NIVEL 10
  { code: 'IOC550', name: 'Taller de Proyecto Integrador de Ingeniería Civil', level: 10, year: 5, sct: 8, area: 'Ingeniería Aplicada', prereqs: ['IOC500', 'IOC501', 'IOC502'] },
  { code: 'IOC551', name: 'Seminario de Titulación', level: 10, year: 5, sct: 6, area: 'Ingeniería Aplicada', prereqs: ['IOC453', 'DII450'] },
  { code: 'IOC552', name: 'Electivo de Especialidad III', level: 10, year: 5, sct: 6, area: 'Gestión y Electivos', prereqs: ['IOC503'] },
  { code: 'IOC553', name: 'Electivo de Especialidad IV', level: 10, year: 5, sct: 6, area: 'Gestión y Electivos', prereqs: ['IOC504'] },
  { code: 'DII550', name: 'Legislación, Ética y Sustentabilidad en Ingeniería', level: 10, year: 5, sct: 4, area: 'Gestión y Electivos', prereqs: ['IOC404'] },
  // NIVEL 11
  { code: 'IOC600', name: 'Actividad de Titulación (Memoria / Proyecto de Título)', level: 11, year: 6, sct: 30, area: 'Ingeniería Aplicada', prereqs: ['IOC550', 'IOC551', 'IOC552', 'IOC553', 'DII550'] }
];

const CIVIL_EXTRACURRICULAR = [
  { code: 'COD592', name: 'Inglés Principiante', category: 'Idioma Inglés (Requisito Licenciatura)', sct: 0, prereqs: [], note: 'Nivel inicial según diagnóstico institucional' },
  { code: 'COD558', name: 'Inglés Básico', category: 'Idioma Inglés (Requisito Licenciatura)', sct: 0, prereqs: ['COD592'], note: 'Continuidad programa de idiomas COD' },
  { code: 'COD559', name: 'Inglés Pre Intermedio', category: 'Idioma Inglés (Requisito Licenciatura)', sct: 0, prereqs: ['COD558'], note: 'Continuidad programa de idiomas COD' },
  { code: 'COD560', name: 'Inglés Intermedio', category: 'Idioma Inglés (Requisito Licenciatura)', sct: 0, prereqs: ['COD559'], note: 'Habilita para rendir Suficiencia de Inglés' },
  { code: 'COD606', name: 'Examen Suficiencia Inglés', category: 'Hito Licenciatura', sct: 0, prereqs: ['COD560'], note: 'Obligatorio junto a Nivel 8 para obtener Grado de Licenciado/a' },
  { code: 'I94500', name: 'Práctica de Estudio I (Operario)', category: 'Prácticas Profesionales', sct: 0, prereqs: ['IOC251'], note: 'Requisito previo a Práctica II (mín. 4° semestre aprobado)' },
  { code: 'I94502', name: 'Práctica de Estudio II (Profesional)', category: 'Prácticas Profesionales', sct: 0, prereqs: ['I94500', 'IOC404'], note: 'Requisito de titulación (mín. 8° semestre aprobado)' },
  { code: 'I94505', name: 'Actividad de Vinculación Profesional', category: 'Vinculación con el Medio', sct: 0, prereqs: [], note: 'Actividad formativa sin expresión intra-aula' },
  { code: 'I94470', name: 'Actividades Extracurriculares', category: 'Formación Integral', sct: 0, prereqs: [], note: 'Deportes, cultura o representación estudiantil UFRO' }
];

// ==================== 2. INGENIERÍA CIVIL INDUSTRIAL (CÓDIGO 30013 - DIC 2025) ====================
const INDUSTRIAL_CURRICULUM = [
  // NIVEL 1 (24 SCT)
  { code: 'ING050', name: 'Ingeniería y Sociedad', level: 1, year: 1, sct: 4, area: 'Ingeniería Aplicada', prereqs: [] },
  { code: 'IME042', name: 'Fundamentos de Cálculo', level: 1, year: 1, sct: 6, area: 'Ciencias Básicas', prereqs: [] },
  { code: 'IME043', name: 'Álgebra', level: 1, year: 1, sct: 6, area: 'Ciencias Básicas', prereqs: [] },
  { code: 'ICQ011', name: 'Introducción a la Química', level: 1, year: 1, sct: 5, area: 'Ciencias Básicas', prereqs: [] },
  { code: 'DFI052', name: 'Habilidades Comunicativas en Ingeniería', level: 1, year: 1, sct: 3, area: 'Formación General', prereqs: [] },
  // NIVEL 2 (26 SCT)
  { code: 'ING101', name: 'Introducción al Diseño de Ingeniería', level: 2, year: 1, sct: 5, area: 'Ingeniería Aplicada', prereqs: ['ING050'] },
  { code: 'IME044', name: 'Cálculo en una Variable', level: 2, year: 1, sct: 6, area: 'Ciencias Básicas', prereqs: ['IME042'] },
  { code: 'IME049', name: 'Matemática para la Computación', level: 2, year: 1, sct: 4, area: 'Ciencias Básicas', prereqs: ['IME043'] },
  { code: 'ICF011', name: 'Física I', level: 2, year: 1, sct: 6, area: 'Ciencias Básicas', prereqs: ['IME042', 'IME043'] },
  { code: 'ING011', name: 'Laboratorio de Ciencias', level: 2, year: 1, sct: 5, area: 'Ciencias Básicas', prereqs: ['ICQ011'] },
  // NIVEL 3 (26 SCT)
  { code: 'ING012', name: 'Fundamentos de Ecodiseño', level: 3, year: 2, sct: 4, area: 'Ingeniería Aplicada', prereqs: ['ING101'] },
  { code: 'IME085', name: 'Cálculo Multivariable', level: 3, year: 2, sct: 5, area: 'Ciencias Básicas', prereqs: ['IME044'] },
  { code: 'IME086', name: 'Álgebra Lineal', level: 3, year: 2, sct: 5, area: 'Ciencias Básicas', prereqs: ['IME043', 'IME049'] },
  { code: 'ICF177', name: 'Física II', level: 3, year: 2, sct: 6, area: 'Ciencias Básicas', prereqs: ['ICF011', 'IME044'] },
  { code: 'ING400', name: 'Electivo de Ingeniería', level: 3, year: 2, sct: 3, area: 'Ingeniería Aplicada', prereqs: ['ING101'] },
  { code: 'ICC157', name: 'Taller de Programación', level: 3, year: 2, sct: 3, area: 'Ingeniería Aplicada', prereqs: ['IME049'] },
  // NIVEL 4 (29 SCT)
  { code: 'ING200', name: 'Taller de Diseño de Ingeniería', level: 4, year: 2, sct: 6, area: 'Ingeniería Aplicada', prereqs: ['ING012'] },
  { code: 'IME088', name: 'Probabilidad y Estadística para Ingeniería', level: 4, year: 2, sct: 5, area: 'Ciencias Básicas', prereqs: ['IME085'] },
  { code: 'IME087', name: 'Ecuaciones Diferenciales', level: 4, year: 2, sct: 6, area: 'Ciencias Básicas', prereqs: ['IME085', 'IME086'] },
  { code: 'ICF013', name: 'Física III', level: 4, year: 2, sct: 5, area: 'Ciencias Básicas', prereqs: ['ICF177', 'IME085'] },
  { code: 'IIS201', name: 'Gestión Ambiental', level: 4, year: 2, sct: 4, area: 'Producción y Operaciones', prereqs: ['ING012', 'ICQ011'] },
  { code: 'I94152', name: 'Electivo de Formación General I', level: 4, year: 2, sct: 3, area: 'Formación General', prereqs: [] },
  // NIVEL 5 (27 SCT)
  { code: 'IIS255', name: 'Economía y Finanzas Empresariales', level: 5, year: 3, sct: 5, area: 'Economía y Negocios', prereqs: ['IME085'] },
  { code: 'IIS251', name: 'Taller de Análisis de Datos', level: 5, year: 3, sct: 5, area: 'Gestión y Electivos', prereqs: ['IME088', 'ICC157'] },
  { code: 'IIS252', name: 'Mecánica Industrial', level: 5, year: 3, sct: 5, area: 'Producción y Operaciones', prereqs: ['ICF011', 'IME087'] },
  { code: 'IIS253', name: 'Termodinámica', level: 5, year: 3, sct: 4, area: 'Producción y Operaciones', prereqs: ['ICF013', 'IME085'] },
  { code: 'IIS254', name: 'Organizaciones y Gestión del Talento Humano', level: 5, year: 3, sct: 5, area: 'Economía y Negocios', prereqs: ['ING200'] },
  { code: 'I94252', name: 'Electivo de Formación General II', level: 5, year: 3, sct: 3, area: 'Formación General', prereqs: [] },
  // NIVEL 6 (28 SCT)
  { code: 'IIS011', name: 'Formulación y Evaluación de Proyectos', level: 6, year: 3, sct: 4, area: 'Economía y Negocios', prereqs: ['IIS255'] },
  { code: 'IIS301', name: 'Investigación de Operaciones', level: 6, year: 3, sct: 5, area: 'Producción y Operaciones', prereqs: ['IME086', 'IME088'] },
  { code: 'IIS302', name: 'Ingeniería Industrial', level: 6, year: 3, sct: 6, area: 'Producción y Operaciones', prereqs: ['ING200', 'IIS254'] },
  { code: 'IIS303', name: 'Automatización Industrial', level: 6, year: 3, sct: 5, area: 'Producción y Operaciones', prereqs: ['IIS252', 'ICC157'] },
  { code: 'IIS304', name: 'Sistemas de Información y Gestión Empresarial', level: 6, year: 3, sct: 5, area: 'Gestión y Electivos', prereqs: ['IIS251', 'IIS254'] },
  { code: 'I94352', name: 'Electivo de Formación General III', level: 6, year: 3, sct: 3, area: 'Formación General', prereqs: [] },
  // NIVEL 7 (29 SCT)
  { code: 'IIS598', name: 'Diseño de Negocios Innovadores', level: 7, year: 4, sct: 4, area: 'Economía y Negocios', prereqs: ['IIS011'] },
  { code: 'IIS351', name: 'Modelos Estocásticos y Simulación', level: 7, year: 4, sct: 5, area: 'Producción y Operaciones', prereqs: ['IIS301', 'IIS251'] },
  { code: 'IIS352', name: 'Gestión de Operaciones', level: 7, year: 4, sct: 5, area: 'Producción y Operaciones', prereqs: ['IIS301', 'IIS302'] },
  { code: 'IIS353', name: 'Macroeconomía', level: 7, year: 4, sct: 6, area: 'Economía y Negocios', prereqs: ['IIS255'] },
  { code: 'IIS354', name: 'Estrategia y Sostenibilidad', level: 7, year: 4, sct: 6, area: 'Economía y Negocios', prereqs: ['IIS201', 'IIS302'] },
  { code: 'I94354', name: 'Electivo de Formación General IV', level: 7, year: 4, sct: 3, area: 'Formación General', prereqs: [] },
  // NIVEL 8 (28 SCT - HITO LICENCIATURA)
  { code: 'ING300', name: 'Taller de Empresas Tecnológicas', level: 8, year: 4, sct: 5, area: 'Ingeniería Aplicada', prereqs: ['IIS598'] },
  { code: 'IIS401', name: 'Tecnología de Manufactura', level: 8, year: 4, sct: 5, area: 'Producción y Operaciones', prereqs: ['IIS303', 'IIS352'] },
  { code: 'IIS402', name: 'Logística y Cadenas de Suministro', level: 8, year: 4, sct: 6, area: 'Producción y Operaciones', prereqs: ['IIS352', 'IIS351'] },
  { code: 'IIS403', name: 'Inglés para Gestión', level: 8, year: 4, sct: 4, area: 'Formación General', prereqs: ['COD560'] },
  { code: 'IIS404', name: 'Electivo de Especialidad I', level: 8, year: 4, sct: 4, area: 'Gestión y Electivos', prereqs: ['IIS352'] },
  { code: 'IIS405', name: 'Electivo de Especialidad II', level: 8, year: 4, sct: 4, area: 'Gestión y Electivos', prereqs: ['IIS354'] },
  // NIVEL 9 (29 SCT)
  { code: 'IIS451', name: 'Diseño de Proyectos de Procesos Industriales', level: 9, year: 5, sct: 5, area: 'Producción y Operaciones', prereqs: ['IIS401', 'IIS402'] },
  { code: 'IIS452', name: 'Inteligencia de Negocios', level: 9, year: 5, sct: 6, area: 'Gestión y Electivos', prereqs: ['IIS304', 'IIS351'] },
  { code: 'IIS453', name: 'Gestión de la Calidad', level: 9, year: 5, sct: 6, area: 'Producción y Operaciones', prereqs: ['IIS352', 'IME088'] },
  { code: 'IIS454', name: 'Taller de Marketing Digital', level: 9, year: 5, sct: 4, area: 'Economía y Negocios', prereqs: ['ING300', 'IIS354'] },
  { code: 'IIS455', name: 'Electivo de Especialidad III', level: 9, year: 5, sct: 4, area: 'Gestión y Electivos', prereqs: ['IIS404'] },
  { code: 'IIS456', name: 'Electivo de Especialidad IV', level: 9, year: 5, sct: 4, area: 'Gestión y Electivos', prereqs: ['IIS405'] },
  // NIVEL 10 (26 SCT)
  { code: 'ING500', name: 'Capstone Multidisciplinario', level: 10, year: 5, sct: 5, area: 'Ingeniería Aplicada', prereqs: ['ING300', 'IIS451'] },
  { code: 'IIS501', name: 'Taller de Modelado y Toma de Decisiones', level: 10, year: 5, sct: 6, area: 'Gestión y Electivos', prereqs: ['IIS452', 'IIS402'] },
  { code: 'IIS502', name: 'Taller de Emprendimiento', level: 10, year: 5, sct: 5, area: 'Economía y Negocios', prereqs: ['ING300', 'IIS454'] },
  { code: 'IIS503', name: 'Gestión de Proyectos', level: 10, year: 5, sct: 6, area: 'Economía y Negocios', prereqs: ['IIS011', 'IIS451'] },
  { code: 'IIS504', name: 'Electivo de Especialidad V', level: 10, year: 5, sct: 4, area: 'Gestión y Electivos', prereqs: ['IIS455'] },
  // NIVEL 11 (29 SCT)
  { code: 'I94460', name: 'Actividad de Titulación', level: 11, year: 6, sct: 29, area: 'Ingeniería Aplicada', prereqs: ['ING500', 'IIS501', 'IIS502', 'IIS503', 'IIS504'] }
];

const SHARED_2025_EXTRACURRICULAR = [
  { code: 'COD592', name: 'Inglés Principiante', category: 'Idioma Inglés (Requisito Licenciatura)', sct: 0, prereqs: [], note: 'Nivel inicial según diagnóstico institucional' },
  { code: 'COD558', name: 'Inglés Básico', category: 'Idioma Inglés (Requisito Licenciatura)', sct: 0, prereqs: ['COD592'], note: 'Continuidad programa de idiomas COD' },
  { code: 'COD559', name: 'Inglés Preintermedio', category: 'Idioma Inglés (Requisito Licenciatura)', sct: 0, prereqs: ['COD558'], note: 'Continuidad programa de idiomas COD' },
  { code: 'COD560', name: 'Inglés Intermedio', category: 'Idioma Inglés (Requisito Licenciatura)', sct: 0, prereqs: ['COD559'], note: 'Habilita para rendir Suficiencia de Inglés' },
  { code: 'COD606', name: 'Examen de Suficiencia Inglés', category: 'Hito Licenciatura (12 SCT)', sct: 12, prereqs: ['COD560'], note: 'Obligatorio junto a Niveles 1-8 para Licenciatura (12 SCT)' },
  { code: 'I94500', name: 'Práctica de Estudios I*', category: 'Prácticas Profesionales (6 SCT)', sct: 6, prereqs: ['ING200'], note: 'Realizar preferentemente en vacaciones de verano (6 SCT)' },
  { code: 'I94502', name: 'Práctica de Estudios II*', category: 'Prácticas Profesionales (6 SCT)', sct: 6, prereqs: ['I94500', 'ING300'], note: 'Realizar preferentemente en vacaciones de verano tras 8° nivel (6 SCT)' },
  { code: 'I94505', name: 'Actividad de Vinculación con entorno profesional***', category: 'Vinculación con el Medio (2 SCT)', sct: 2, prereqs: [], note: 'Puede realizarse hasta el décimo nivel de la carrera (2 SCT)' },
  { code: 'I94470', name: 'Actividades Extracurriculares***', category: 'Formación Integral (3 SCT)', sct: 3, prereqs: [], note: 'Puede realizarse hasta el décimo nivel de la carrera (3 SCT)' }
];

// ==================== 3. INGENIERÍA CIVIL EN BIOTECNOLOGÍA (CÓDIGO 30090 - DIC 2025) ====================
const BIOTECH_CURRICULUM = [
  // NIVEL 1 (24 SCT)
  { code: 'ING050', name: 'Ingeniería y Sociedad', level: 1, year: 1, sct: 4, area: 'Ingeniería Aplicada', prereqs: [] },
  { code: 'IME042', name: 'Fundamentos de Cálculo', level: 1, year: 1, sct: 6, area: 'Ciencias Básicas', prereqs: [] },
  { code: 'IME043', name: 'Álgebra', level: 1, year: 1, sct: 6, area: 'Ciencias Básicas', prereqs: [] },
  { code: 'ICQ011', name: 'Introducción a la Química', level: 1, year: 1, sct: 5, area: 'Ciencias Básicas', prereqs: [] },
  { code: 'DFI052', name: 'Habilidades Comunicativas en Ingeniería', level: 1, year: 1, sct: 3, area: 'Formación General', prereqs: [] },
  // NIVEL 2 (26 SCT)
  { code: 'ING101', name: 'Introducción al Diseño de Ingeniería', level: 2, year: 1, sct: 5, area: 'Ingeniería Aplicada', prereqs: ['ING050'] },
  { code: 'IME044', name: 'Cálculo en una Variable', level: 2, year: 1, sct: 6, area: 'Ciencias Básicas', prereqs: ['IME042'] },
  { code: 'IME049', name: 'Matemática para la Computación', level: 2, year: 1, sct: 4, area: 'Ciencias Básicas', prereqs: ['IME043'] },
  { code: 'ICF011', name: 'Física I', level: 2, year: 1, sct: 6, area: 'Ciencias Básicas', prereqs: ['IME042', 'IME043'] },
  { code: 'ING011', name: 'Laboratorio de Ciencias', level: 2, year: 1, sct: 5, area: 'Ciencias Básicas', prereqs: ['ICQ011'] },
  // NIVEL 3 (26 SCT)
  { code: 'ING012', name: 'Fundamentos de Ecodiseño', level: 3, year: 2, sct: 4, area: 'Ingeniería Aplicada', prereqs: ['ING101'] },
  { code: 'ING400', name: 'Electivo de Ingeniería', level: 3, year: 2, sct: 3, area: 'Ingeniería Aplicada', prereqs: ['ING101'] },
  { code: 'IME085', name: 'Cálculo Multivariable', level: 3, year: 2, sct: 5, area: 'Ciencias Básicas', prereqs: ['IME044'] },
  { code: 'IME086', name: 'Álgebra Lineal', level: 3, year: 2, sct: 5, area: 'Ciencias Básicas', prereqs: ['IME043', 'IME049'] },
  { code: 'ICF177', name: 'Física II', level: 3, year: 2, sct: 6, area: 'Ciencias Básicas', prereqs: ['ICF011', 'IME044'] },
  { code: 'ICC157', name: 'Taller de Programación', level: 3, year: 2, sct: 3, area: 'Ingeniería Aplicada', prereqs: ['IME049'] },
  // NIVEL 4 (29 SCT)
  { code: 'ING200', name: 'Taller de Diseño de Ingeniería', level: 4, year: 2, sct: 6, area: 'Ingeniería Aplicada', prereqs: ['ING012'] },
  { code: 'IBT201', name: 'Termodinámica General', level: 4, year: 2, sct: 5, area: 'Ingeniería de Bioprocesos', prereqs: ['ICQ011', 'IME085'] },
  { code: 'IBT202', name: 'Química Orgánica', level: 4, year: 2, sct: 4, area: 'Biociencias y Genética', prereqs: ['ICQ011', 'ING011'] },
  { code: 'IME087', name: 'Ecuaciones Diferenciales', level: 4, year: 2, sct: 6, area: 'Ciencias Básicas', prereqs: ['IME085', 'IME086'] },
  { code: 'ICF013', name: 'Física III', level: 4, year: 2, sct: 5, area: 'Ciencias Básicas', prereqs: ['ICF177', 'IME085'] },
  { code: 'I94152', name: 'Electivo de Formación General I', level: 4, year: 2, sct: 3, area: 'Formación General', prereqs: [] },
  // NIVEL 5 (30 SCT)
  { code: 'IIS255', name: 'Economía y Finanzas Empresariales', level: 5, year: 3, sct: 5, area: 'Gestión y Electivos', prereqs: ['IME085'] },
  { code: 'IBT251', name: 'Biología y Bioquímica General', level: 5, year: 3, sct: 5, area: 'Biociencias y Genética', prereqs: ['IBT202'] },
  { code: 'IBT252', name: 'Balance de Materia y Energía', level: 5, year: 3, sct: 6, area: 'Ingeniería de Bioprocesos', prereqs: ['IBT201', 'IME087'] },
  { code: 'IBT253', name: 'Mecánica de Sistemas Fluidos', level: 5, year: 3, sct: 6, area: 'Ingeniería de Bioprocesos', prereqs: ['ICF011', 'IME087'] },
  { code: 'IME088', name: 'Probabilidad y Estadística para Ingeniería', level: 5, year: 3, sct: 5, area: 'Ciencias Básicas', prereqs: ['IME085'] },
  { code: 'I94252', name: 'Electivo de Formación General II', level: 5, year: 3, sct: 3, area: 'Formación General', prereqs: [] },
  // NIVEL 6 (30 SCT)
  { code: 'IIS011', name: 'Formulación y Evaluación de Proyectos', level: 6, year: 3, sct: 4, area: 'Gestión y Electivos', prereqs: ['IIS255'] },
  { code: 'IBT301', name: 'Microbiología General', level: 6, year: 3, sct: 6, area: 'Biociencias y Genética', prereqs: ['IBT251'] },
  { code: 'IBT302', name: 'Biología Molecular', level: 6, year: 3, sct: 5, area: 'Biociencias y Genética', prereqs: ['IBT251'] },
  { code: 'IBT303', name: 'Transferencia de Calor y Masa', level: 6, year: 3, sct: 6, area: 'Ingeniería de Bioprocesos', prereqs: ['IBT252', 'IBT253'] },
  { code: 'IBT304', name: 'Bioinformática', level: 6, year: 3, sct: 6, area: 'Biociencias y Genética', prereqs: ['IBT251', 'ICC157', 'IME088'] },
  { code: 'I94352', name: 'Electivo de Formación General III', level: 6, year: 3, sct: 3, area: 'Formación General', prereqs: [] },
  // NIVEL 7 (29 SCT)
  { code: 'IIS598', name: 'Diseño de Negocios Innovadores', level: 7, year: 4, sct: 4, area: 'Gestión y Electivos', prereqs: ['IIS011'] },
  { code: 'IBT351', name: 'Operaciones Unitarias', level: 7, year: 4, sct: 6, area: 'Ingeniería de Bioprocesos', prereqs: ['IBT303'] },
  { code: 'IBT352', name: 'Ingeniería Genética', level: 7, year: 4, sct: 5, area: 'Biociencias y Genética', prereqs: ['IBT302'] },
  { code: 'IBT353', name: 'Enzimas y Estructura de Proteínas', level: 7, year: 4, sct: 5, area: 'Biociencias y Genética', prereqs: ['IBT251', 'IBT302'] },
  { code: 'IBT354', name: 'Microbiología Aplicada', level: 7, year: 4, sct: 5, area: 'Biociencias y Genética', prereqs: ['IBT301'] },
  { code: 'IBT355', name: 'Sistemas de Gestión', level: 7, year: 4, sct: 4, area: 'Gestión y Electivos', prereqs: ['ING200', 'IIS011'] },
  // NIVEL 8 (26 SCT - HITO LICENCIATURA)
  { code: 'ING300', name: 'Taller de Empresas Tecnológicas', level: 8, year: 4, sct: 5, area: 'Ingeniería Aplicada', prereqs: ['IIS598'] },
  { code: 'IBT401', name: 'Tópicos en Inmunología y Biomédica', level: 8, year: 4, sct: 5, area: 'Biociencias y Genética', prereqs: ['IBT352', 'IBT353'] },
  { code: 'IBT402', name: 'Ingeniería Metabólica', level: 8, year: 4, sct: 6, area: 'Biociencias y Genética', prereqs: ['IBT352', 'IBT304'] },
  { code: 'IBT403', name: 'Diseño de Biorreactores', level: 8, year: 4, sct: 5, area: 'Ingeniería de Bioprocesos', prereqs: ['IBT351', 'IBT354'] },
  { code: 'IBT404', name: 'Modelación y Simulación de Procesos', level: 8, year: 4, sct: 5, area: 'Ingeniería de Bioprocesos', prereqs: ['IBT351', 'IME087'] },
  // NIVEL 9 (26 SCT)
  { code: 'IBT451', name: 'Taller de Diseño de Procesos Biotecnológicos', level: 9, year: 5, sct: 5, area: 'Ingeniería de Bioprocesos', prereqs: ['IBT403', 'IBT404'] },
  { code: 'IBT452', name: 'Electivo de Especialidad I', level: 9, year: 5, sct: 4, area: 'Gestión y Electivos', prereqs: ['IBT402'] },
  { code: 'IBT453', name: 'Electivo de Especialidad II', level: 9, year: 5, sct: 4, area: 'Gestión y Electivos', prereqs: ['IBT403'] },
  { code: 'IBT454', name: 'Purificación y Separación de Proteínas', level: 9, year: 5, sct: 5, area: 'Ingeniería de Bioprocesos', prereqs: ['IBT351', 'IBT353'] },
  { code: 'IBT455', name: 'Control e Instrumentación de Procesos', level: 9, year: 5, sct: 5, area: 'Ingeniería de Bioprocesos', prereqs: ['IBT404'] },
  { code: 'I94354', name: 'Electivo de Formación General IV', level: 9, year: 5, sct: 3, area: 'Formación General', prereqs: [] },
  // NIVEL 10 (26 SCT)
  { code: 'ING500', name: 'Capstone Multidisciplinario', level: 10, year: 5, sct: 5, area: 'Ingeniería Aplicada', prereqs: ['ING300', 'IBT451'] },
  { code: 'IBT501', name: 'Electivo de Especialidad III', level: 10, year: 5, sct: 4, area: 'Gestión y Electivos', prereqs: ['IBT452'] },
  { code: 'IBT502', name: 'Electivo de Especialidad IV', level: 10, year: 5, sct: 4, area: 'Gestión y Electivos', prereqs: ['IBT453'] },
  { code: 'IBT503', name: 'Recursos Humanos y Legislación Laboral', level: 10, year: 5, sct: 5, area: 'Gestión y Electivos', prereqs: ['IBT355'] },
  { code: 'IBT504', name: 'Servicios y Seguridad Industrial', level: 10, year: 5, sct: 5, area: 'Ingeniería de Bioprocesos', prereqs: ['IBT451', 'IBT355'] },
  { code: 'IBT505', name: 'Industria de Procesos Biotecnológicos', level: 10, year: 5, sct: 3, area: 'Ingeniería de Bioprocesos', prereqs: ['IBT451', 'IBT454'] },
  // NIVEL 11 (29 SCT)
  { code: 'I94460', name: 'Actividad de Titulación', level: 11, year: 6, sct: 29, area: 'Ingeniería Aplicada', prereqs: ['ING500', 'IBT501', 'IBT502', 'IBT503', 'IBT504', 'IBT505'] }
];

const CAREERS_CONFIG = {
  '30013': {
    code: '30013',
    shortName: 'Ing. Civil Industrial',
    fullName: 'Ingeniería Civil Industrial',
    subtitle: 'Plan de Estudios Act. Dic 2025 · 11 Semestres · 330 SCT (301 Intra-aula + 29 Extracurriculares)',
    storageKey: 'ufro_malla_progress_30013',
    curriculum: INDUSTRIAL_CURRICULUM,
    extracurricular: SHARED_2025_EXTRACURRICULAR,
    accentGradient: 'from-[#001E42] via-[#002B5C] to-[#7A1638]',
    badgeColor: 'bg-rose-500/20 text-rose-200 border-rose-400/40'
  },
  '30090': {
    code: '30090',
    shortName: 'Ing. Civil en Biotecnología',
    fullName: 'Ingeniería Civil en Biotecnología',
    subtitle: 'Plan de Estudios Act. Dic 2025 · 11 Semestres · 330 SCT (301 Intra-aula + 29 Extracurriculares)',
    storageKey: 'ufro_malla_progress_30090',
    curriculum: BIOTECH_CURRICULUM,
    extracurricular: SHARED_2025_EXTRACURRICULAR,
    accentGradient: 'from-[#001E42] via-[#002B5C] to-[#0D5C63]',
    badgeColor: 'bg-teal-400/20 text-teal-200 border-teal-400/40'
  },
  '30094': {
    code: '30094',
    shortName: 'Ing. Civil',
    fullName: 'Ingeniería Civil',
    subtitle: 'Plan de Estudios Oficial · 11 Semestres · 330 SCT',
    storageKey: 'ufro_iciv_30094_statuses',
    curriculum: CIVIL_CURRICULUM,
    extracurricular: CIVIL_EXTRACURRICULAR,
    accentGradient: 'from-[#001E42] via-[#002B5C] to-[#003E7E]',
    badgeColor: 'bg-amber-400/20 text-amber-300 border-amber-400/30'
  }
};

const AREA_COLORS = {
  'Ciencias Básicas': {
    badge: 'bg-sky-100 text-sky-800 border-sky-200',
    dot: 'bg-sky-500',
    border: 'border-l-sky-500'
  },
  'Ingeniería Aplicada': {
    badge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    dot: 'bg-indigo-600',
    border: 'border-l-indigo-600'
  },
  'Estructuras y Geotecnia': {
    badge: 'bg-amber-100 text-amber-800 border-amber-200',
    dot: 'bg-amber-500',
    border: 'border-l-amber-500'
  },
  'Hidráulica y Transporte': {
    badge: 'bg-teal-100 text-teal-800 border-teal-200',
    dot: 'bg-teal-500',
    border: 'border-l-teal-500'
  },
  'Producción y Operaciones': {
    badge: 'bg-rose-100 text-rose-800 border-rose-200',
    dot: 'bg-rose-500',
    border: 'border-l-rose-500'
  },
  'Economía y Negocios': {
    badge: 'bg-amber-100 text-amber-800 border-amber-200',
    dot: 'bg-amber-500',
    border: 'border-l-amber-500'
  },
  'Ingeniería de Bioprocesos': {
    badge: 'bg-teal-100 text-teal-800 border-teal-200',
    dot: 'bg-teal-500',
    border: 'border-l-teal-500'
  },
  'Biociencias y Genética': {
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    dot: 'bg-emerald-500',
    border: 'border-l-emerald-500'
  },
  'Gestión y Electivos': {
    badge: 'bg-purple-100 text-purple-800 border-purple-200',
    dot: 'bg-purple-500',
    border: 'border-l-purple-500'
  },
  'Formación General': {
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
    dot: 'bg-slate-400',
    border: 'border-l-slate-400'
  }
};

const YEAR_LABELS = {
  1: 'Primer Año',
  2: 'Segundo Año',
  3: 'Tercer Año',
  4: 'Cuarto Año',
  5: 'Quinto Año',
  6: 'Sexto Año'
};

export default function App() {
  // Carrera seleccionada por defecto: Ingeniería Civil Industrial (30013)
  const [selectedCareerCode, setSelectedCareerCode] = useState(() => {
    try {
      const savedCareer = localStorage.getItem('ufro_selected_career_code');
      return savedCareer && CAREERS_CONFIG[savedCareer] ? savedCareer : '30013';
    } catch {
      return '30013';
    }
  });

  const activeCareer = CAREERS_CONFIG[selectedCareerCode];
  const CURRICULUM_DATA = activeCareer.curriculum;
  const EXTRACURRICULAR_DATA = activeCareer.extracurricular;

  // Estados de progreso independientes por carrera en localStorage
  const [allCareersStatuses, setAllCareersStatuses] = useState(() => {
    const initial = {};
    Object.values(CAREERS_CONFIG).forEach((cfg) => {
      try {
        const saved = localStorage.getItem(cfg.storageKey);
        initial[cfg.code] = saved ? JSON.parse(saved) : {};
      } catch {
        initial[cfg.code] = {};
      }
    });
    return initial;
  });

  const statuses = allCareersStatuses[selectedCareerCode] || {};

  const setStatuses = (updater) => {
    setAllCareersStatuses((prevAll) => {
      const currentCareerMap = prevAll[selectedCareerCode] || {};
      const nextCareerMap =
        typeof updater === 'function' ? updater(currentCareerMap) : updater;
      try {
        localStorage.setItem(activeCareer.storageKey, JSON.stringify(nextCareerMap));
      } catch (e) {
        console.error('Error guardando progreso:', e);
      }
      return {
        ...prevAll,
        [selectedCareerCode]: nextCareerMap
      };
    });
  };

  // Cambiar de carrera limpiando selección/filtros transitorios
  const handleSelectCareer = (code) => {
    setSelectedCareerCode(code);
    setSelectedCourseCode(null);
    setHoveredCourseCode(null);
    setSelectedArea('Todas');
    try {
      localStorage.setItem('ufro_selected_career_code', code);
    } catch (e) {
      console.error(e);
    }
    showToast(`Cambiado a ${CAREERS_CONFIG[code].fullName} (Cód. ${code})`);
  };

  // Ramo seleccionado para ver detalles o resaltado al pasar mouse
  const [selectedCourseCode, setSelectedCourseCode] = useState(null);
  const [hoveredCourseCode, setHoveredCourseCode] = useState(null);

  // Filtros y búsqueda
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('Todas');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [quickApproveLevel, setQuickApproveLevel] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const scrollContainerRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Mapa unificado de todos los ramos + actividades de la carrera activa
  const allItemsMap = useMemo(() => {
    const map = {};
    CURRICULUM_DATA.forEach((c) => {
      map[c.code] = { ...c, isExtracurricular: false };
    });
    EXTRACURRICULAR_DATA.forEach((e) => {
      map[e.code] = { ...e, isExtracurricular: true, area: 'Formación General' };
    });
    return map;
  }, [CURRICULUM_DATA, EXTRACURRICULAR_DATA]);

  // Áreas dinámicas según la carrera activa
  const availableAreas = useMemo(() => {
    const set = new Set(CURRICULUM_DATA.map((c) => c.area));
    return Array.from(set);
  }, [CURRICULUM_DATA]);

  // Calcular ramos que desbloquea cada ramo (hacia adelante directo)
  const unlocksMap = useMemo(() => {
    const map = {};
    Object.keys(allItemsMap).forEach((code) => {
      map[code] = [];
    });
    Object.values(allItemsMap).forEach((item) => {
      item.prereqs.forEach((pre) => {
        if (map[pre]) {
          map[pre].push(item.code);
        }
      });
    });
    return map;
  }, [allItemsMap]);

  // Obtener cadena completa de prerrequisitos (directos e indirectos) y desbloqueos futuros (directos e indirectos)
  const activeFocusCode = hoveredCourseCode || selectedCourseCode;

  const { directPrereqs, indirectPrereqs, directUnlocks, indirectUnlocks } = useMemo(() => {
    const dPre = new Set();
    const iPre = new Set();
    const dUnl = new Set();
    const iUnl = new Set();

    if (!activeFocusCode || !allItemsMap[activeFocusCode]) {
      return {
        directPrereqs: dPre,
        indirectPrereqs: iPre,
        directUnlocks: dUnl,
        indirectUnlocks: iUnl
      };
    }

    // Hacia atrás (Prerrequisitos)
    const rootItem = allItemsMap[activeFocusCode];
    rootItem.prereqs.forEach((p) => dPre.add(p));

    const queueBack = [...rootItem.prereqs];
    while (queueBack.length > 0) {
      const curr = queueBack.shift();
      const currItem = allItemsMap[curr];
      if (currItem) {
        currItem.prereqs.forEach((p) => {
          if (!dPre.has(p) && !iPre.has(p)) {
            iPre.add(p);
            queueBack.push(p);
          }
        });
      }
    }

    // Hacia adelante (Desbloqueos)
    const firstUnlocks = unlocksMap[activeFocusCode] || [];
    firstUnlocks.forEach((u) => dUnl.add(u));

    const queueForward = [...firstUnlocks];
    while (queueForward.length > 0) {
      const curr = queueForward.shift();
      const nextUnlocks = unlocksMap[curr] || [];
      nextUnlocks.forEach((u) => {
        if (!dUnl.has(u) && !iUnl.has(u)) {
          iUnl.add(u);
          queueForward.push(u);
        }
      });
    }

    return {
      directPrereqs: dPre,
      indirectPrereqs: iPre,
      directUnlocks: dUnl,
      indirectUnlocks: iUnl
    };
  }, [activeFocusCode, allItemsMap, unlocksMap]);

  // Determinar el estado efectivo de cada ramo
  const getCourseEffectiveStatus = (code) => {
    if (statuses[code] === 'approved') return 'approved';
    if (statuses[code] === 'enrolled') return 'enrolled';

    const item = allItemsMap[code];
    if (!item) return 'locked';

    // Verificar si todos los prerrequisitos están aprobados
    const allPrereqsApproved = item.prereqs.every((pre) => statuses[pre] === 'approved');
    return allPrereqsApproved ? 'available' : 'locked';
  };

  // Ciclar estado al hacer clic en una tarjeta
  const handleCycleStatus = (code, e) => {
    if (e) e.stopPropagation();
    const current = getCourseEffectiveStatus(code);
    const item = allItemsMap[code];

    if (current === 'locked') {
      const missing = item.prereqs
        .filter((p) => statuses[p] !== 'approved')
        .map((p) => `${p} (${allItemsMap[p]?.name || ''})`)
        .join(', ');
      showToast(`Ramo bloqueado. Falta aprobar: ${missing}`);
      setSelectedCourseCode(code);
      return;
    }

    setStatuses((prev) => {
      const next = { ...prev };
      if (current === 'available') {
        next[code] = 'enrolled';
      } else if (current === 'enrolled') {
        next[code] = 'approved';
      } else if (current === 'approved') {
        delete next[code];
      }
      return next;
    });
  };

  // Establecer estado explícito desde el panel lateral o botones rápidos
  const setExplicitStatus = (code, targetStatus) => {
    setStatuses((prev) => {
      const next = { ...prev };
      if (targetStatus === 'none') {
        delete next[code];
      } else {
        next[code] = targetStatus;
      }
      return next;
    });
  };

  // Aprobar automáticamente hasta Nivel X (ideal para alumnos de 2° a 6° año)
  const handleApproveUpToLevel = (maxLevel) => {
    if (!maxLevel) return;
    const lvl = parseInt(maxLevel, 10);
    setStatuses((prev) => {
      const next = { ...prev };
      CURRICULUM_DATA.forEach((course) => {
        if (course.level <= lvl) {
          next[course.code] = 'approved';
        }
      });
      // Si aprueba hasta nivel 8 o más, aprobar inglés hasta suficiencia (requisito de Licenciatura)
      if (lvl >= 8) {
        ['COD592', 'COD558', 'COD559', 'COD560', 'COD606'].forEach((c) => {
          next[c] = 'approved';
        });
      }
      return next;
    });
    showToast(`¡Ramos de ${activeCareer.shortName} hasta Nivel ${lvl} marcados como aprobados!`);
    setQuickApproveLevel('');
  };

  // Limpiar todo el progreso de la carrera activa
  const handleResetAll = () => {
    setStatuses({});
    setSelectedCourseCode(null);
    showToast(`Progreso de ${activeCareer.shortName} reiniciado a cero.`);
  };

  // Métricas y cálculos del dashboard (incluyendo SCT de actividades extracurriculares con créditos)
  const stats = useMemo(() => {
    const totalSCT = 330;
    let approvedSCT = 0;
    let approvedCount = 0;
    let enrolledSCT = 0;
    let enrolledCount = 0;
    let availableCount = 0;

    CURRICULUM_DATA.forEach((course) => {
      const st = getCourseEffectiveStatus(course.code);
      if (st === 'approved') {
        approvedSCT += course.sct;
        approvedCount += 1;
      } else if (st === 'enrolled') {
        enrolledSCT += course.sct;
        enrolledCount += 1;
      } else if (st === 'available') {
        availableCount += 1;
      }
    });

    // Sumar SCT de actividades extracurriculares (en mallas 2025 suman 29 SCT: Inglés 12, Prácticas 12, Vinc 2, Extra 3)
    EXTRACURRICULAR_DATA.forEach((item) => {
      const st = getCourseEffectiveStatus(item.code);
      if (st === 'approved') {
        approvedSCT += item.sct;
        if (item.sct > 0) approvedCount += 1;
      } else if (st === 'enrolled') {
        enrolledSCT += item.sct;
        if (item.sct > 0) enrolledCount += 1;
      }
    });

    // Verificar Hito Licenciatura (Todos los ramos Nivel 1 a 8 aprobados + Examen Suficiencia Inglés COD606)
    const level1to8Courses = CURRICULUM_DATA.filter((c) => c.level <= 8);
    const all1to8Approved = level1to8Courses.every((c) => statuses[c.code] === 'approved');
    const englishApproved = statuses['COD606'] === 'approved';
    const hasLicenciatura = all1to8Approved && englishApproved;

    const progressPct = Math.min(100, Math.round((approvedSCT / totalSCT) * 1000) / 10);

    return {
      totalSCT,
      approvedSCT,
      approvedCount,
      enrolledSCT,
      enrolledCount,
      availableCount,
      progressPct,
      hasLicenciatura,
      all1to8Approved,
      englishApproved
    };
  }, [statuses, CURRICULUM_DATA, EXTRACURRICULAR_DATA]);

  // Filtrado de ramos
  const matchesFilter = (course) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      course.code.toLowerCase().includes(query) ||
      course.name.toLowerCase().includes(query);

    const matchesArea = selectedArea === 'Todas' || course.area === selectedArea;

    const st = getCourseEffectiveStatus(course.code);
    const matchesAvail = !onlyAvailable || st === 'available' || st === 'enrolled';

    return matchesSearch && matchesArea && matchesAvail;
  };

  // Agrupar niveles por Año para las cabeceras superiores
  const yearsStructure = [
    { year: 1, label: 'Primer Año', levels: [1, 2] },
    { year: 2, label: 'Segundo Año', levels: [3, 4] },
    { year: 3, label: 'Tercer Año', levels: [5, 6] },
    { year: 4, label: 'Cuarto Año', levels: [7, 8], milestone: 'Licenciatura' },
    { year: 5, label: 'Quinto Año', levels: [9, 10] },
    { year: 6, label: 'Sexto Año', levels: [11], milestone: 'Título Profesional' }
  ];

  const scrollHorizontally = (direction) => {
    if (scrollContainerRef.current) {
      const amount = direction === 'left' ? -520 : 520;
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const selectedCourseDetail = selectedCourseCode ? allItemsMap[selectedCourseCode] : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-200 selection:text-blue-950">
      {/* NOTIFICACIÓN FLOTANTE (TOAST) */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-md bg-[#002B5C] text-white px-4 py-3 rounded-xl shadow-2xl border border-blue-400/30 flex items-center gap-3 animate-fade-in">
          <Info className="w-5 h-5 text-sky-300 shrink-0" />
          <p className="text-sm font-medium leading-snug">{toastMessage}</p>
          <button
            onClick={() => setToastMessage(null)}
            className="text-blue-200 hover:text-white ml-auto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* HEADER INSTITUCIONAL UFRO CON SELECTOR DE CARRERA */}
      <header
        className={`bg-gradient-to-r ${activeCareer.accentGradient} text-white shadow-lg border-b border-blue-900/50 transition-all duration-500`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 space-y-4">
          {/* SELECTOR PROMINENTE DE CARRERA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-white/15">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-200">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Facultad de Ingeniería y Ciencias UFRO · Selecciona tu Carrera:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 bg-black/25 p-1 rounded-xl border border-white/15">
              {[
                { code: '30013', label: 'Ing. Civil Industrial', icon: Factory },
                { code: '30090', label: 'Ing. Civil en Biotecnología', icon: FlaskConical },
                { code: '30094', label: 'Ing. Civil', icon: HardHat }
              ].map((tab) => {
                const IconComp = tab.icon;
                const isActive = selectedCareerCode === tab.code;
                return (
                  <button
                    key={tab.code}
                    onClick={() => handleSelectCareer(tab.code)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#002B5C] shadow-md scale-[1.01]'
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-[#002B5C]' : 'text-sky-300'}`} />
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-extrabold ${
                        isActive
                          ? 'bg-blue-100 text-[#002B5C]'
                          : 'bg-white/10 text-blue-200'
                      }`}
                    >
                      {tab.code}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Identidad Carrera Activa */}
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center shrink-0 shadow-inner">
                <span className="text-[10px] font-bold tracking-widest text-sky-300 uppercase">UFRO</span>
                <GraduationCap className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2 py-0.5 text-[11px] font-bold tracking-wider uppercase rounded border ${activeCareer.badgeColor}`}
                  >
                    Código {activeCareer.code}
                  </span>
                  <span className="text-xs text-blue-200 font-medium">
                    Universidad de La Frontera · Guardado automático independiente
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mt-0.5">
                  Malla Interactiva {activeCareer.fullName}
                </h1>
                <p className="text-xs text-blue-200/90 mt-0.5">{activeCareer.subtitle}</p>
              </div>
            </div>

            {/* Tarjetas Resumen de Progreso y Simulador Toma de Ramos */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:min-w-[600px]">
              {/* Progreso Total SCT */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
                <div className="flex items-center justify-between text-xs text-blue-200 mb-1">
                  <span className="font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Avance Carrera
                  </span>
                  <span className="font-bold text-white">{stats.progressPct}%</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-extrabold text-white">
                    {stats.approvedSCT} <span className="text-xs font-normal text-blue-200">/ 330 SCT</span>
                  </span>
                  <span className="text-[11px] text-emerald-300 font-medium">
                    {stats.approvedCount} aprob.
                  </span>
                </div>
                <div className="w-full h-1.5 bg-blue-950/80 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full transition-all duration-500"
                    style={{ width: `${stats.progressPct}%` }}
                  />
                </div>
              </div>

              {/* Simulador Carga Toma de Ramos (Inscritos) */}
              <div
                className={`rounded-xl p-3 border transition-colors ${
                  stats.enrolledSCT > 32
                    ? 'bg-rose-950/60 border-rose-400/50'
                    : 'bg-white/10 backdrop-blur-md border-white/15'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-blue-200 mb-1">
                  <span className="font-medium flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-300" />
                    Toma de Ramos
                  </span>
                  {stats.enrolledSCT > 32 ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-rose-300 bg-rose-500/20 px-1.5 py-0.5 rounded">
                      <AlertTriangle className="w-3 h-3" /> Sobrecarga
                    </span>
                  ) : (
                    <span className="text-[11px] text-sky-300 font-medium">Máx. rec. 30-32</span>
                  )}
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-extrabold text-amber-300">
                    {stats.enrolledSCT} <span className="text-xs font-normal text-blue-200">SCT insc.</span>
                  </span>
                  <span className="text-[11px] text-blue-200">
                    {stats.enrolledCount} {stats.enrolledCount === 1 ? 'ramo' : 'ramos'}
                  </span>
                </div>
                <p className="text-[10px] text-blue-200/80 mt-1.5 truncate">
                  {stats.enrolledCount === 0
                    ? 'Haz clic en ramos disponibles para simular'
                    : stats.enrolledSCT > 32
                    ? '¡Cuidado! Superas los 32 SCT semestrales'
                    : `${stats.availableCount} ramos más disponibles para tomar`}
                </p>
              </div>

              {/* Estado Hito Licenciatura */}
              <div
                className={`rounded-xl p-3 border transition-all ${
                  stats.hasLicenciatura
                    ? 'bg-gradient-to-br from-amber-500/30 to-yellow-600/20 border-amber-400/60'
                    : 'bg-white/10 backdrop-blur-md border-white/15'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-blue-200 mb-1">
                  <span className="font-medium flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Grado Licenciado/a
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      stats.hasLicenciatura
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-white/10 text-blue-200'
                    }`}
                  >
                    {stats.hasLicenciatura ? 'OBTENIDO' : 'EN CURSO'}
                  </span>
                </div>
                <div className="text-xs font-semibold text-white mt-0.5">
                  Nivel 1 al 8 + Suficiencia Inglés
                </div>
                <div className="flex items-center gap-2 mt-2 text-[11px]">
                  <span
                    className={`flex items-center gap-1 ${
                      stats.all1to8Approved ? 'text-emerald-300' : 'text-blue-200/70'
                    }`}
                  >
                    {stats.all1to8Approved ? '✓' : '○'} Niveles 1-8
                  </span>
                  <span
                    className={`flex items-center gap-1 ${
                      stats.englishApproved ? 'text-emerald-300' : 'text-blue-200/70'
                    }`}
                  >
                    {stats.englishApproved ? '✓' : '○'} Inglés COD606
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* BARRA DE CONTROLES, FILTROS Y LEYENDA INTERACTIVA */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 space-y-3">
          {/* Fila 1: Buscador, Filtro Área, Toggle Disponibles y Acciones Rápidas */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
              {/* Buscador */}
              <div className="relative flex-1 max-w-xs min-w-[200px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar ramo o código (ej. IME042)..."
                  className="w-full pl-9 pr-8 py-1.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Selector de Área */}
              <div className="flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-slate-500 hidden sm:block" />
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="text-sm bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Todas">Todas las áreas</option>
                  {availableAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleResetAll}
                title="Reiniciar toda la malla"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpiar</span>
              </button>
            </div>
          </div>

          {/* Fila 2: Leyenda de Estados y Guía de Interacción */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                Estados (Clic para cambiar):
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block shadow-xs" />
                Aprobado
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-3 h-3 rounded-sm bg-amber-400 inline-block shadow-xs" />
                Inscrito (Toma de Ramos)
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-3 h-3 rounded-sm bg-white border-2 border-blue-500 inline-block" />
                Disponible para tomar
              </span>
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className="w-3 h-3 rounded-sm bg-slate-200 border border-slate-300 inline-block" />
                Bloqueado (Falta prerreq.)
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1 text-orange-700 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
                Prerrequisitos (Atrás)
              </span>
              <span className="flex items-center gap-1 text-cyan-700 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" />
                Ramos que habilita (Adelante)
              </span>
              <div className="hidden md:flex items-center gap-1 ml-2">
                <button
                  onClick={() => scrollHorizontally('left')}
                  className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                  title="Desplazar izquierda"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollHorizontally('right')}
                  className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                  title="Desplazar derecha"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL: MALLA HORIZONTAL + PANEL LATERAL DETALLE */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">
        {/* COLUMNA IZQUIERDA/CENTRAL: MALLA CURRICULAR Y EXTRACURRICULARES */}
        <div className="flex-1 min-w-0 space-y-8">
          {/* CONTENEDOR CON SCROLL HORIZONTAL DE LOS 11 NIVELES */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent"
          >
            <div className="inline-flex gap-4 min-w-max items-stretch">
              {yearsStructure.map((yearGroup) => (
                <div
                  key={yearGroup.year}
                  className={`flex flex-col rounded-2xl p-3 border relative ${
                    yearGroup.milestone === 'Licenciatura'
                      ? 'bg-gradient-to-b from-blue-50/80 to-amber-50/40 border-amber-300/80 shadow-sm'
                      : 'bg-slate-100/70 border-slate-200/90'
                  }`}
                >
                  {/* Cabecera del Año */}
                  <div className="flex items-center justify-between px-2 pb-2.5 mb-2 border-b border-slate-200/80">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#002B5C]">
                      {yearGroup.label}
                    </span>
                    {yearGroup.milestone && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          yearGroup.milestone === 'Licenciatura'
                            ? 'bg-amber-400 text-slate-950 shadow-xs'
                            : 'bg-[#002B5C] text-white'
                        }`}
                      >
                        <Award className="w-3 h-3" />
                        {yearGroup.milestone}
                      </span>
                    )}
                  </div>

                  {/* Columnas de Niveles dentro del Año */}
                  <div className="flex gap-3.5 items-stretch">
                    {yearGroup.levels.map((levelNum) => {
                      const levelCourses = CURRICULUM_DATA.filter((c) => c.level === levelNum);
                      const levelTotalSCT = levelCourses.reduce((acc, c) => acc + c.sct, 0);
                      const levelApprovedSCT = levelCourses
                        .filter((c) => statuses[c.code] === 'approved')
                        .reduce((acc, c) => acc + c.sct, 0);

                      return (
                        <div key={levelNum} className="w-[235px] flex flex-col">
                          {/* Header del Semestre / Nivel */}
                          <div className="bg-[#002B5C] text-white rounded-xl px-3 py-2 mb-3 shadow-xs flex items-center justify-between">
                            <div>
                              <div className="text-xs font-extrabold tracking-wide">
                                NIVEL {levelNum}
                              </div>
                              <div className="text-[10px] text-blue-200">
                                Semestre {levelNum}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-bold text-amber-300">
                                {levelTotalSCT} SCT
                              </div>
                              <div className="text-[10px] text-emerald-300">
                                {levelApprovedSCT}/{levelTotalSCT} aprob.
                              </div>
                            </div>
                          </div>

                          {/* Lista de Ramos del Nivel */}
                          <div className="flex flex-col gap-2.5 flex-1">
                            {levelCourses.map((course) => {
                              const status = getCourseEffectiveStatus(course.code);
                              const isVisible = matchesFilter(course);
                              const isSelected = selectedCourseCode === course.code;
                              const isHovered = hoveredCourseCode === course.code;

                              // Relaciones de grafo con el ramo actualmente enfocado
                              const isDirectPrereq = directPrereqs.has(course.code);
                              const isIndirectPrereq = indirectPrereqs.has(course.code);
                              const isDirectUnlock = directUnlocks.has(course.code);
                              const isIndirectUnlock = indirectUnlocks.has(course.code);

                              const hasActiveFocus = Boolean(activeFocusCode);
                              const isRelatedToFocus =
                                isSelected ||
                                isHovered ||
                                isDirectPrereq ||
                                isIndirectPrereq ||
                                isDirectUnlock ||
                                isIndirectUnlock;

                              const areaStyle = AREA_COLORS[course.area] || AREA_COLORS['Formación General'];
                              const unlocksCount = (unlocksMap[course.code] || []).length;

                              // Estilos base según estado del ramo
                              let cardStateStyle = '';
                              if (status === 'approved') {
                                cardStateStyle =
                                  'bg-emerald-50/95 border-emerald-500 text-emerald-950 shadow-xs';
                              } else if (status === 'enrolled') {
                                cardStateStyle =
                                  'bg-amber-50 border-amber-400 text-amber-950 ring-2 ring-amber-300/60 shadow-sm';
                              } else if (status === 'available') {
                                cardStateStyle =
                                  'bg-white border-blue-400 text-slate-900 shadow-sm hover:border-blue-600 hover:shadow-md';
                              } else {
                                cardStateStyle =
                                  'bg-slate-100/90 border-slate-300 text-slate-500 opacity-85';
                              }

                              // Sobrescritura visual cuando hay hover/selección de ruta crítica
                              let relationRing = '';
                              if (isDirectPrereq) {
                                relationRing = 'ring-2 ring-orange-500 !border-orange-500 !bg-orange-50/90 !opacity-100';
                              } else if (isIndirectPrereq) {
                                relationRing = 'ring-2 ring-orange-300 border-dashed !border-orange-400 !opacity-100';
                              } else if (isDirectUnlock) {
                                relationRing = 'ring-2 ring-cyan-500 !border-cyan-500 !bg-cyan-50/90 !opacity-100';
                              } else if (isIndirectUnlock) {
                                relationRing = 'ring-2 ring-cyan-300 border-dashed !border-cyan-400 !opacity-100';
                              } else if (isSelected || isHovered) {
                                relationRing = 'ring-2 ring-[#002B5C] scale-[1.02] z-10 !opacity-100';
                              } else if (hasActiveFocus && !isRelatedToFocus) {
                                relationRing = 'opacity-35 grayscale-[40%]';
                              }

                              if (!isVisible) {
                                relationRing += ' opacity-20 pointer-events-none';
                              }

                              return (
                                <div
                                  key={course.code}
                                  onClick={(e) => handleCycleStatus(course.code, e)}
                                  onMouseEnter={() => setHoveredCourseCode(course.code)}
                                  onMouseLeave={() => setHoveredCourseCode(null)}
                                  className={`group relative rounded-xl border-2 border-l-4 ${areaStyle.border} p-2.5 transition-all duration-200 cursor-pointer select-none flex flex-col justify-between min-h-[112px] ${cardStateStyle} ${relationRing}`}
                                >
                                  {/* Etiqueta flotante de relación si aplica */}
                                  {(isDirectPrereq || isIndirectPrereq || isDirectUnlock || isIndirectUnlock) && (
                                    <div
                                      className={`absolute -top-2.5 right-2 px-1.5 py-0.2 rounded text-[9px] font-extrabold uppercase tracking-wider text-white shadow-xs ${
                                        isDirectPrereq || isIndirectPrereq
                                          ? 'bg-orange-600'
                                          : 'bg-cyan-600'
                                      }`}
                                    >
                                      {isDirectPrereq
                                        ? 'Prerreq. Directo'
                                        : isIndirectPrereq
                                        ? 'Prerreq. Previo'
                                        : isDirectUnlock
                                        ? 'Habilita Directo'
                                        : 'Habilita Futuro'}
                                    </div>
                                  )}

                                  {/* Fila superior: Código, Créditos SCT e Icono Estado */}
                                  <div>
                                    <div className="flex items-center justify-between gap-1 mb-1">
                                      <span className="text-[11px] font-extrabold tracking-tight px-1.5 py-0.5 rounded bg-slate-900/5 text-slate-700">
                                        {course.code}
                                      </span>

                                      <div className="flex items-center gap-1.5">
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-800 text-white">
                                          {course.sct} SCT
                                        </span>

                                        {/* Icono de estado */}
                                        {status === 'approved' && (
                                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                        )}
                                        {status === 'enrolled' && (
                                          <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                                        )}
                                        {status === 'available' && (
                                          <Circle className="w-4 h-4 text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                                        )}
                                        {status === 'locked' && (
                                          <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        )}
                                      </div>
                                    </div>

                                    {/* Nombre del Ramo */}
                                    <h3 className="text-xs font-bold leading-snug line-clamp-2 mt-1">
                                      {course.name}
                                    </h3>
                                  </div>

                                  {/* Fila inferior: Prerrequisitos, Desbloqueos y Botón Info */}
                                  <div className="flex items-center justify-between mt-2.5 pt-1.5 border-t border-black/5 text-[10px]">
                                    <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                                      {course.prereqs.length > 0 ? (
                                        <span
                                          title={`Prerrequisitos: ${course.prereqs.join(', ')}`}
                                          className="flex items-center gap-0.5 bg-slate-200/70 px-1.5 py-0.5 rounded text-slate-700"
                                        >
                                          <ArrowLeft className="w-2.5 h-2.5 text-orange-600" />
                                          {course.prereqs.length}
                                        </span>
                                      ) : (
                                        <span className="text-[9px] text-slate-400 italic">Sin prerreq.</span>
                                      )}

                                      {unlocksCount > 0 && (
                                        <span
                                          title={`Desbloquea ${unlocksCount} ramo(s)`}
                                          className="flex items-center gap-0.5 bg-slate-200/70 px-1.5 py-0.5 rounded text-slate-700"
                                        >
                                          <ArrowRight className="w-2.5 h-2.5 text-cyan-600" />
                                          {unlocksCount}
                                        </span>
                                      )}
                                    </div>

                                    {/* Botón para inspeccionar detalles sin ciclar estado */}
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedCourseCode(course.code);
                                      }}
                                      className="px-1.5 py-0.5 rounded bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-semibold transition flex items-center gap-0.5"
                                      title="Ver detalle y ruta crítica"
                                    >
                                      <Info className="w-3 h-3" />
                                      <span>Detalle</span>
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECCIÓN INFERIOR: ACTIVIDADES EXTRACURRICULARES / SIN EXPRESIÓN INTRA-AULA */}
          <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#002B5C]" />
                  <h2 className="text-base font-extrabold text-[#002B5C]">
                    Actividades Extracurriculares y Requisitos Sin Expresión Intra-Aula
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Programa de Inglés COD (requisito de Licenciatura), Prácticas de Estudio y Actividades Formativas UFRO.
                </p>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 self-start sm:self-auto">
                {EXTRACURRICULAR_DATA.reduce((sum, item) => sum + item.sct, 0)} SCT · Requisitos Obligatorios de Grado / Título
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
              {EXTRACURRICULAR_DATA.map((item) => {
                const status = getCourseEffectiveStatus(item.code);
                const isSelected = selectedCourseCode === item.code;
                const isDirectPrereq = directPrereqs.has(item.code);
                const isDirectUnlock = directUnlocks.has(item.code);

                let style =
                  'bg-slate-50 border-slate-300 text-slate-600 opacity-90';
                if (status === 'approved') {
                  style = 'bg-emerald-50 border-emerald-500 text-emerald-950';
                } else if (status === 'enrolled') {
                  style = 'bg-amber-50 border-amber-400 text-amber-950';
                } else if (status === 'available') {
                  style = 'bg-white border-blue-300 text-slate-900 hover:border-blue-500';
                }

                if (isDirectPrereq) style += ' ring-2 ring-orange-500';
                if (isDirectUnlock) style += ' ring-2 ring-cyan-500';
                if (isSelected) style += ' ring-2 ring-[#002B5C]';

                return (
                  <div
                    key={item.code}
                    onClick={(e) => handleCycleStatus(item.code, e)}
                    onMouseEnter={() => setHoveredCourseCode(item.code)}
                    onMouseLeave={() => setHoveredCourseCode(null)}
                    className={`rounded-xl border-2 p-3 cursor-pointer transition-all flex flex-col justify-between ${style}`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[11px] font-extrabold px-1.5 py-0.5 rounded bg-slate-900/5 text-slate-700">
                          {item.code}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {item.sct > 0 && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-800 text-white">
                              {item.sct} SCT
                            </span>
                          )}
                          {status === 'approved' && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          )}
                          {status === 'enrolled' && (
                            <Calendar className="w-4 h-4 text-amber-600" />
                          )}
                          {status === 'available' && (
                            <Circle className="w-4 h-4 text-blue-500" />
                          )}
                          {status === 'locked' && (
                            <Lock className="w-3.5 h-3.5 text-slate-400" />
                          )}
                        </div>
                      </div>
                      <h3 className="text-xs font-bold leading-snug">{item.name}</h3>
                      <p className="text-[10px] text-slate-500 mt-1">{item.category}</p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-black/5">
                      <span className="text-[10px] text-slate-500">
                        {item.prereqs.length > 0 ? `Req: ${item.prereqs.join(', ')}` : 'Sin req.'}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCourseCode(item.code);
                        }}
                        className="text-[10px] font-bold text-blue-700 hover:underline"
                      >
                        Detalle
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* PANEL LATERAL DERECHO: INSPECTOR DE RAMO Y TOMA DE RAMOS */}
        <aside className="w-full lg:w-[340px] shrink-0 space-y-4">
          {/* Detalle del Ramo Seleccionado */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sticky top-36">
            {selectedCourseDetail ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 text-xs font-extrabold rounded bg-[#002B5C] text-white">
                        {selectedCourseDetail.code}
                      </span>
                      {!selectedCourseDetail.isExtracurricular && (
                        <span className="text-xs font-bold text-slate-600">
                          Nivel {selectedCourseDetail.level} · {selectedCourseDetail.sct} SCT
                        </span>
                      )}
                    </div>
                    <h2 className="text-base font-extrabold text-slate-900 mt-2 leading-snug">
                      {selectedCourseDetail.name}
                    </h2>
                    <span
                      className={`inline-block mt-1.5 text-[11px] font-semibold px-2 py-0.5 rounded border ${
                        (AREA_COLORS[selectedCourseDetail.area] || AREA_COLORS['Formación General'])
                          .badge
                      }`}
                    >
                      {selectedCourseDetail.area}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedCourseCode(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {selectedCourseDetail.note && (
                  <div className="p-2.5 rounded-lg bg-blue-50 text-blue-900 text-xs border border-blue-100">
                    {selectedCourseDetail.note}
                  </div>
                )}

                {/* Selector Rápido de Estado del Ramo */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Cambiar estado del ramo:
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() => setExplicitStatus(selectedCourseDetail.code, 'none')}
                      className={`py-2 px-2 rounded-lg text-xs font-bold border transition cursor-pointer ${
                        !statuses[selectedCourseDetail.code]
                          ? 'bg-slate-800 text-white border-slate-800'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Pendiente
                    </button>
                    <button
                      onClick={() => setExplicitStatus(selectedCourseDetail.code, 'enrolled')}
                      className={`py-2 px-2 rounded-lg text-xs font-bold border transition cursor-pointer ${
                        statuses[selectedCourseDetail.code] === 'enrolled'
                          ? 'bg-amber-400 text-slate-950 border-amber-500'
                          : 'bg-white text-amber-700 border-amber-200 hover:bg-amber-50'
                      }`}
                    >
                      Inscribir
                    </button>
                    <button
                      onClick={() => setExplicitStatus(selectedCourseDetail.code, 'approved')}
                      className={`py-2 px-2 rounded-lg text-xs font-bold border transition cursor-pointer ${
                        statuses[selectedCourseDetail.code] === 'approved'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50'
                      }`}
                    >
                      Aprobar
                    </button>
                  </div>
                </div>

                {/* Lista de Prerrequisitos */}
                <div className="pt-2 border-t border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-orange-700 flex items-center gap-1.5 mb-2">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Prerrequisitos ({selectedCourseDetail.prereqs.length})
                  </h3>
                  {selectedCourseDetail.prereqs.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">
                      Este ramo no exige prerrequisitos previos.
                    </p>
                  ) : (
                    <ul className="space-y-1.5">
                      {selectedCourseDetail.prereqs.map((preCode) => {
                        const preItem = allItemsMap[preCode];
                        const isApproved = statuses[preCode] === 'approved';
                        return (
                          <li
                            key={preCode}
                            onClick={() => setSelectedCourseCode(preCode)}
                            className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition ${
                              isApproved
                                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                                : 'bg-orange-50/60 border-orange-200 text-slate-800 hover:bg-orange-100/60'
                            }`}
                          >
                            <div className="min-w-0 pr-2">
                              <span className="font-extrabold mr-1.5">{preCode}</span>
                              <span className="truncate">{preItem?.name}</span>
                            </div>
                            {isApproved ? (
                              <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-600 text-white">
                                ✓ Aprob.
                              </span>
                            ) : (
                              <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-200 text-orange-900">
                                Falta
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                {/* Lista de Ramos que Desbloquea */}
                <div className="pt-2 border-t border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-700 flex items-center gap-1.5 mb-2">
                    <ArrowRight className="w-3.5 h-3.5" />
                    Habilita a cursar ({(unlocksMap[selectedCourseDetail.code] || []).length})
                  </h3>
                  {(unlocksMap[selectedCourseDetail.code] || []).length === 0 ? (
                    <p className="text-xs text-slate-500 italic">
                      Ramo terminal de línea (no es prerrequisito directo de otros ramos).
                    </p>
                  ) : (
                    <ul className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {(unlocksMap[selectedCourseDetail.code] || []).map((unCode) => {
                        const unItem = allItemsMap[unCode];
                        return (
                          <li
                            key={unCode}
                            onClick={() => setSelectedCourseCode(unCode)}
                            className="flex items-center justify-between p-2 rounded-lg border border-cyan-200 bg-cyan-50/50 hover:bg-cyan-100/60 text-xs cursor-pointer transition"
                          >
                            <div className="min-w-0 pr-2">
                              <span className="font-extrabold text-cyan-900 mr-1.5">{unCode}</span>
                              <span className="text-slate-800">{unItem?.name}</span>
                            </div>
                            {!unItem?.isExtracurricular && (
                              <span className="shrink-0 text-[10px] font-semibold text-slate-500">
                                Nv.{unItem?.level}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              /* Resumen de Toma de Ramos cuando no hay ramo seleccionado */
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#002B5C]">
                  <BookOpen className="w-5 h-5" />
                  <h2 className="text-base font-extrabold">Simulador Toma de Ramos</h2>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Haz <strong>clic sobre cualquier ramo disponible</strong> en la malla para inscribirlo en tu semestre proyectado, o vuelve a hacer clic para marcarlo como aprobado.
                </p>

                {/* Lista de Ramos Inscritos Actualmente */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Ramos Inscritos ({stats.enrolledCount})
                    </span>
                    <span
                      className={`text-xs font-extrabold ${
                        stats.enrolledSCT > 32 ? 'text-rose-600' : 'text-[#002B5C]'
                      }`}
                    >
                      {stats.enrolledSCT} SCT
                    </span>
                  </div>

                  {stats.enrolledCount === 0 ? (
                    <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-center">
                      <p className="text-xs text-slate-500">
                        Aún no has seleccionado ramos para cursar este semestre.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                      {Object.keys(statuses)
                        .filter((code) => statuses[code] === 'enrolled')
                        .map((code) => {
                          const item = allItemsMap[code];
                          if (!item) return null;
                          return (
                            <div
                              key={code}
                              onClick={() => setSelectedCourseCode(code)}
                              className="flex items-center justify-between p-2 rounded-lg bg-amber-50 border border-amber-300 text-xs cursor-pointer hover:bg-amber-100/70"
                            >
                              <div className="min-w-0 pr-2">
                                <span className="font-extrabold text-amber-900 mr-1.5">{code}</span>
                                <span className="text-slate-800">{item.name}</span>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-200 text-amber-950">
                                  {item.sct} SCT
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExplicitStatus(code, 'none');
                                  }}
                                  className="text-slate-400 hover:text-rose-600"
                                  title="Quitar de toma de ramos"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>

                {/* Leyenda de Áreas Formativas */}
                <div className="pt-3 border-t border-slate-100">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Áreas de Formación
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {availableAreas.map((areaName) => {
                      const style = AREA_COLORS[areaName] || AREA_COLORS['Formación General'];
                      return (
                        <button
                          key={areaName}
                          onClick={() =>
                            setSelectedArea(selectedArea === areaName ? 'Todas' : areaName)
                          }
                          className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs border transition text-left cursor-pointer ${
                            selectedArea === areaName
                              ? 'bg-blue-50 border-blue-400 font-bold text-blue-950'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
                            {areaName}
                          </span>
                          {selectedArea === areaName && (
                            <span className="text-[10px] text-blue-600">Activo</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}