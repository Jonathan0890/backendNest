import { diskStorage } from "multer";

export const storageConfig = {
    storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    })
}