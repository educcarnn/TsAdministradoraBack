/*
import multer, { Options } from 'multer';

const storage = multer.memoryStorage();  // Usamos o armazenamento em memória para uploads temporários antes de enviar para o S3

const fileFilter: Options['fileFilter'] = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];  // Você pode adicionar mais tipos de arquivo conforme necessário
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de arquivo não suportado'), false);
    }
};

export const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limite de 5MB por arquivo. Ajuste conforme necessário
    }
});
*/