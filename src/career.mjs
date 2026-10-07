// Dates explicitly supplied by the owner on 14 September 2026.
// Audi / Driven by Art remains undated until the ambiguous attribution is clarified.
// Diesel is pending the same clarification. Never infer a project scope or date.
export const career = [
  {name:'UNIDO / La Minute Creative',start:2015,end:2019},
  {name:'USAID / Career Centers',start:2017,end:2019},
  {name:'Audi / Driven by Art'},
  {name:'Diptyk',start:2019,end:2021},
  {name:'Inception',start:2021,end:2023},
  {name:'BananaCorp',start:2022,end:2025},
  {name:'Quantum Branding',start:2024,end:null}
];

export function careerPeriod(entry,lang){
  if(!entry.start)return '';
  return `${entry.start} - ${entry.end ?? (lang==='fr'?'aujourd’hui':'present')}`;
}
