export interface Prodotto {
    id: number
    nome: string
    categoria: string
    prezzo: number
    taglie_disponibili: object
    colori_disponibili: object
    descrizione: string
    immagine: string
    nuovo_arrivi: boolean
    best_seller: number
}
