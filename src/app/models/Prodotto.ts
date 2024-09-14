export interface Prodotto {
    id: number;
    nome: string;
    categoria: string;
    prezzo: number;
    taglie_disponibili:string[];
    colori_disponibili: string[];
    descrizione: string;
    immagine: string;
    nuovo_arrivi: boolean;
    best_seller: number;
    taglia?: string;
    colore?: string;
}
