export interface Book {
  id: string;
  firstPreviewImage: {
    watermarked: string;
  };
  title: string;
  price: string;
  author: {
    details: {
      publicName: string;
    };
  };
}
