import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private categories: Category[] = [
    { id: 1, name: 'sportowa', color: '#47b39d' },
    { id: 2, name: 'muzyczna', color: '#ffc153' },
    { id: 3, name: 'kulturalna', color: '#eb6b56' },
    { id: 4, name: 'edukacyjna', color: '#b05f6d' },
    { id: 5, name: 'rekreacyjna', color: '#9969c7' }
  ];

  private events: Event[] = [
    { id: 1, name: 'Mistrzostwa Polski w Piłce Nożnej', description: 'Najlepsze drużyny piłkarskie z całego kraju rywalizują o tytuł mistrza Polski. Niezapomniane emocje i zacięta walka na boisku. Kibice mogą liczyć na wiele emocjonujących momentów i niespodziewane zwroty akcji.', start_date: '2024-03-10', end_date: '2024-03-17', image: 'assets/images/1.png', category_id: 1 },
    { id: 2, name: 'Superliga Siatkarska', description: 'Najlepsze drużyny siatkarskie walczą w ekscytujących meczach o tytuł mistrza Superligi. Dynamiczne akcje i wspaniała atmosfera na arenie. Turniej przyciąga fanów z całego kraju, którzy dopingują swoje drużyny.', start_date: '2024-04-10', end_date: '2024-04-12', image: 'assets/images/2.png', category_id: 1 },
    { id: 3, name: 'Wiosenny Maraton', description: 'Coroczny bieg przyciągający miłośników sportu z całego kraju. Trasa prowadzi przez najpiękniejsze zakątki miasta, umożliwiając podziwianie wiosennych krajobrazów. To doskonała okazja, aby sprawdzić swoją kondycję i cieszyć się świeżym powietrzem oraz wyjątkową atmosferą zawodów.', start_date: '2024-05-24', end_date: '2024-05-24', image: 'assets/images/3.png', category_id: 1 },
    { id: 4, name: 'Lekkoatletyczne Mistrzostwa Polski', description: 'Zawody lekkoatletyczne z udziałem najlepszych polskich sportowców, rywalizujących w różnych dyscyplinach. Emocje i rekordy na najwyższym poziomie. Impreza przyciąga kibiców zainteresowanych różnorodnymi konkurencjami.', start_date: '2024-07-14', end_date: '2024-07-19', image: 'assets/images/4.png', category_id: 1 },
    { id: 5, name: 'Nocny Bieg na Orientację', description: 'Wyjątkowe wydarzenie, które łączy bieg z orientacją terenową po zmroku. Uczestnicy korzystają z map i kompasów, aby dotrzeć do wyznaczonych punktów kontrolnych. Niezapomniana przygoda dla wszystkich miłośników aktywności na świeżym powietrzu.', start_date: '2024-09-25', end_date: '2024-09-26', image: 'assets/images/5.png', category_id: 1 },
    { id: 6, name: 'Festiwal Muzyki Filmowej', description: 'Koncerty orkiestr symfonicznych, wykonujących znane utwory filmowe. Niezapomniana podróż przez świat muzyki filmowej. Idealne wydarzenie dla miłośników kina i muzyki.', start_date: '2024-02-05', end_date: '2024-02-06', image: 'assets/images/6.png', category_id: 2 },
    { id: 7, name: 'Koncert Gwiazd Rocka', description: 'Wieczór pełen niezapomnianych rockowych hitów w wykonaniu największych gwiazd muzyki rockowej. Energia na najwyższym poziomie. Koncert przyciąga tłumy fanów gotowych na świetną zabawę.', start_date: '2024-05-15', end_date: '2024-05-16', image: 'assets/images/7.png', category_id: 2 },
    { id: 8, name: 'Festiwal Jazzowy', description: 'Trzydniowy festiwal, podczas którego występują najwybitniejsi jazzowi muzycy z całego świata. Niezapomniane występy i wyjątkowa atmosfera. Fani jazzu mogą liczyć na niezapomniane wrażenia muzyczne.', start_date: '2024-07-10', end_date: '2024-07-12', image: 'assets/images/8.png', category_id: 2 },
    { id: 9, name: 'Koncert Muzyki Klasycznej', description: 'Wyjątkowy wieczór, gdzie najlepsze orkiestry wykonują dzieła klasyczne na najwyższym poziomie artystycznym. Klasyka w najlepszym wydaniu. Idealne wydarzenie dla miłośników muzyki poważnej.', start_date: '2024-08-25', end_date: '2024-08-26', image: 'assets/images/9.png', category_id: 2 },
    { id: 10, name: 'Festiwal Muzyki Elektronicznej', description: 'Energetyczne występy znanych DJ-ów i producentów muzyki elektronicznej, gwarantujące niezapomnianą noc pełną tańca. Idealne wydarzenie dla miłośników klubowej atmosfery. Niezapomniane przeżycie dla wszystkich uczestników.', start_date: '2024-10-15', end_date: '2024-10-17', image: 'assets/images/10.png', category_id: 2 },
    { id: 11, name: 'Międzynarodowy Festiwal Teatralny', description: 'Przedstawienia teatralne z całego świata, ukazujące różnorodność kultur i tradycji scenicznych. Wyjątkowe spektakle na najwyższym poziomie. Festiwal przyciąga miłośników teatru i sztuki scenicznej.', start_date: '2024-03-20', end_date: '2024-03-22', image: 'assets/images/11.png', category_id: 3 },
    { id: 12, name: 'Festiwal Sztuki Współczesnej', description: 'Wystawy, instalacje artystyczne i performance\'y, prezentujące najnowsze trendy w sztuce współczesnej. Inspirujące spotkania ze sztuką. Idealne wydarzenie dla miłośników nowoczesnej twórczości.', start_date: '2024-04-05', end_date: '2024-04-07', image: 'assets/images/12.png', category_id: 3 },
    { id: 13, name: 'Dni Kultury Ludowej', description: 'Występy zespołów ludowych, warsztaty rzemiosła i degustacje tradycyjnych potraw z różnych regionów Polski. Barwne i pełne emocji wydarzenie. Świetna okazja do zapoznania się z bogatą kulturą ludową.', start_date: '2024-06-10', end_date: '2024-06-12', image: 'assets/images/13.png', category_id: 3 },
    { id: 14, name: 'Festiwal Filmowy', description: 'Projekcje filmów fabularnych, dokumentalnych i krótkometrażowych z całego świata, zakończone galą wręczenia nagród. Kino na najwyższym poziomie. Święto dla miłośników kina i twórczości filmowej.', start_date: '2024-09-01', end_date: '2024-09-03', image: 'assets/images/14.png', category_id: 3 },
    { id: 15, name: 'Noc Muzeów', description: 'Wyjątkowa noc, podczas której muzea i galerie sztuki otwarte są dla zwiedzających do późnych godzin nocnych, oferując specjalne wystawy i wydarzenia. Idealna okazja do odkrywania kultury i historii. Niezapomniane przeżycia dla wszystkich uczestników.', start_date: '2024-11-10', end_date: '2024-11-11', image: 'assets/images/15.png', category_id: 3 },
    { id: 16, name: 'Kongres Naukowy', description: 'Spotkanie naukowców z różnych dziedzin, prezentujące najnowsze osiągnięcia i badania. Wykłady, panele dyskusyjne i warsztaty. Idealna okazja do wymiany wiedzy i doświadczeń.', start_date: '2024-01-10', end_date: '2024-01-12', image: 'assets/images/16.png', category_id: 4 },
    { id: 17, name: 'Konferencja Technologiczna', description: 'Wydarzenie skupiające ekspertów technologii, prezentujących innowacyjne rozwiązania i trendy w dziedzinie IT i technologii. Wykłady i prezentacje. Świetna okazja do poznania najnowszych osiągnięć w świecie technologii.', start_date: '2024-05-05', end_date: '2024-05-07', image: 'assets/images/17.png', category_id: 4 },
    { id: 18, name: 'Warsztaty Literackie', description: 'Trzydniowe warsztaty dla pisarzy i poetów, prowadzone przez znanych autorów, z możliwością prezentacji własnych prac. Inspirujące spotkania i twórcza atmosfera. Idealne wydarzenie dla miłośników literatury.', start_date: '2024-07-20', end_date: '2024-07-22', image: 'assets/images/18.png', category_id: 4 },
    { id: 19, name: 'Seminarium Zdrowia Publicznego', description: 'Wykłady i panele dyskusyjne na temat zdrowia publicznego, profilaktyki chorób i promocji zdrowego stylu życia. Spotkania z ekspertami. Ważne wydarzenie dla wszystkich zainteresowanych zdrowiem publicznym.', start_date: '2024-09-15', end_date: '2024-09-18', image: 'assets/images/19.png', category_id: 4 },
    { id: 20, name: 'Festiwal Nauki Dla Dzieci', description: 'Interaktywne stoiska, pokazy naukowe i warsztaty edukacyjne dla dzieci i dorosłych, promujące naukę i technologię. Fascynujące prezentacje. Idealna okazja do zgłębienia tajemnic nauki.', start_date: '2024-11-24', end_date: '2024-11-26', image: 'assets/images/20.png', category_id: 4 },
    { id: 21, name: 'Festiwal Rowerowy', description: 'Zawody rowerowe, pokazy akrobacji i warsztaty dla miłośników jazdy na rowerze. Idealne wydarzenie dla rodzin i aktywnych osób. Uczestnicy mogą liczyć na pełne emocji dni pełne sportowych wrażeń.', start_date: '2024-04-01', end_date: '2024-04-03', image: 'assets/images/21.png', category_id: 5 },
    { id: 22, name: 'Bieg Charytatywny', description: 'Bieg na różnych dystansach, mający na celu zbiórkę funduszy na cele charytatywne. Uczestnicy mogą biegać, spacerować lub nordic walking. Wydarzenie promuje zdrowy styl życia i wspieranie potrzebujących.', start_date: '2024-06-14', end_date: '2024-06-15', image: 'assets/images/22.png', category_id: 5 },
    { id: 23, name: 'Piknik Rodzinny', description: 'Wydarzenie pełne atrakcji dla całej rodziny, z grami, konkursami, występami artystycznymi i strefą gastronomiczną. Idealna okazja do spędzenia czasu z bliskimi na świeżym powietrzu. Zapewnia niezapomniane wspomnienia dla uczestników w każdym wieku.', start_date: '2024-07-24', end_date: '2024-07-24', image: 'assets/images/23.png', category_id: 5 },
    { id: 24, name: 'Zlot Miłośników Motoryzacji', description: 'Spotkanie fanów motoryzacji, z pokazami samochodów zabytkowych, wyścigami i warsztatami z mechaniki i tuningu. Wydarzenie dla wszystkich entuzjastów motoryzacji i technologii. Wspaniała okazja do zobaczenia unikalnych pojazdów.', start_date: '2024-09-20', end_date: '2024-09-22', image: 'assets/images/24.png', category_id: 5 },
    { id: 25, name: 'Festiwal Fitness', description: 'Całodniowe wydarzenie pełne zajęć fitness, warsztatów zdrowego stylu życia i pokazów sportowych. Idealne dla tych, którzy chcą zadbać o swoją formę i zdrowie. Uczestnicy mogą liczyć na profesjonalne porady trenerów i inspirację do aktywnego życia.', start_date: '2024-12-10', end_date: '2024-12-12', image: 'assets/images/25.png', category_id: 5 }
  ];

  constructor() { }

  // Event methods
  getEvents(): Event[] {
    return this.events;
  }

  getEventById(id: number): Event | undefined {
    return this.events.find(event => event.id === id);
  }

  addEvent(event: Event): void {
    this.events.push(event);
  }

  updateEvent(updatedEvent: Event): void {
    const index = this.events.findIndex(event => event.id === updatedEvent.id);
    if (index !== -1) {
      this.events[index] = updatedEvent;
    }
  }

  deleteEvent(id: number): void {
    this.events = this.events.filter(event => event.id !== id);
  }

  // Category methods
  getCategories(): Category[] {
    return this.categories;
  }

  getCategoryById(id: number): Category | undefined {
    return this.categories.find(category => category.id === id);
  }

  addCategory(category: Category): void {
    this.categories.push(category);
  }

  updateCategory(updatedCategory: Category): void {
    const index = this.categories.findIndex(category => category.id === updatedCategory.id);
    if (index !== -1) {
      this.categories[index] = updatedCategory;
    }
  }

  deleteCategory(id: number): void {
    const hasEvents = this.events.some(event => event.category_id === id);
    if (hasEvents) {
      throw new Error('Cannot delete category with associated events.');
    }
    this.categories = this.categories.filter(category => category.id !== id);
  }

  getCategoryColorById(id: number): string | undefined {
    const category = this.categories.find(category => category.id === id);
    return category ? category.color : undefined;
  }
}
