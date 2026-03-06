package com.scholarassist.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.scholarassist.entity.Document;
import com.scholarassist.repository.DocumentRepository;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    // ================= UPLOAD DOCUMENT =================
    public Document uploadDocument(Long userId, String documentType, MultipartFile file) throws IOException {

        if (!file.getContentType().equals("application/pdf")) {
            throw new RuntimeException("Only PDF files allowed");
        }

        Document doc = new Document();

        doc.setUserId(userId);
        doc.setDocumentType(documentType);

        // file information
        doc.setFileName(file.getOriginalFilename());
        doc.setFileType(file.getContentType());
        doc.setFileSize(file.getSize());

        // upload info
        doc.setUploadDate(LocalDateTime.now());

        // default verification status
        doc.setVerificationStatus("PENDING");

        // actual file
        doc.setFileData(file.getBytes());

        return documentRepository.save(doc);
    }

    // ================= GET USER DOCUMENTS =================
    public List<Document> getUserDocuments(Long userId) {
        return documentRepository.findByUserId(userId);
    }

    // ================= VIEW DOCUMENT =================
    public byte[] getDocumentFile(Long id) {

        Document doc = documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found"));

        return doc.getFileData();
    }

    // ================= DELETE DOCUMENT =================
    public void deleteDocument(Long id) {
        documentRepository.deleteById(id);
    }
}