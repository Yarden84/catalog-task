interface Image {
    aspectRatio: number;
    imageUrl: string;
    focalPoint: {
        x: number;
        y: number
    };
    maxWidth: string;
    alt: string;
}

export interface PromotionalSpots {
    link: string;
    position: number;
    type: string;
    image: Image;
    imageAltText: string;
    _alias: string
}