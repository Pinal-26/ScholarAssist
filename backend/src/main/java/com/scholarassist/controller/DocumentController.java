package com.scholarassist.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.scholarassist.entity.Document;
import com.scholarassist.service.DocumentService;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin("*")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    // ================= UPLOAD =================
    @PostMapping(value="/upload", consumes="multipart/form-data")
    public Document uploadDocument(
            @RequestParam("userId") Long userId,
            @RequestParam("documentType") String documentType,
            @RequestParam("file") MultipartFile file
    ) throws IOException {

        return documentService.uploadDocument(userId, documentType, file);
    }

    // ================= GET USER DOCUMENTS =================
    @GetMapping("/user/{userId}")
    public List<Document> getUserDocuments(@PathVariable Long userId) {
        return documentService.getUserDocuments(userId);
    }

    // ================= VIEW DOCUMENT =================
   @GetMapping("/view/{id}")
public ResponseEntity<byte[]> viewDocument(@PathVariable Long id) {

    byte[] file = documentService.getDocumentFile(id);

    return ResponseEntity.ok()
            .contentType(org.springframework.http.MediaType.APPLICATION_PDF)
            .header("Content-Disposition", "inline; filename=document.pdf")
            .body(file);
}

    // ================= DELETE DOCUMENT =================
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDocument(@PathVariable Long id) {

        documentService.deleteDocument(id);

        return ResponseEntity.ok("Document deleted successfully");
    }

    
}