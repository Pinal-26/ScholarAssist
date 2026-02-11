package com.scholarassist.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.scholarassist.entity.Scholarship;

@Service
public class ScholarshipScraperService {

    public List<Scholarship> scrapeScholarships() {

        List<Scholarship> list = new ArrayList<>();

        try {

            // 🔥 TEMPORARY TEST DATA
            // Replace this later with real Jsoup scraping

            Scholarship s1 = new Scholarship();
            s1.setId(null);
            s1.setTitle("Digital Gujarat Merit Scholarship");
            s1.setCategory("General");
            s1.setAmount(60000);
            s1.setDeadline(LocalDate.parse("2026-03-31"));
            list.add(s1);

            Scholarship s2 = new Scholarship();
            s2.setId(null);
            s2.setTitle("Post Matric Scholarship for OBC");
            s2.setCategory("OBC");
            s2.setAmount(50000);
            s2.setDeadline(LocalDate.parse("2026-02-28"));
            list.add(s2);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }
}


// package com.scholarassist.service;

// import java.time.LocalDate;
// import java.util.ArrayList;
// import java.util.List;

// import org.jsoup.Jsoup;
// import org.jsoup.nodes.Document;
// import org.jsoup.nodes.Element;
// import org.jsoup.select.Elements;
// import org.springframework.stereotype.Service;

// import com.scholarassist.entity.Scholarship;

// @Service
// public class ScholarshipScraperService {

//     public List<Scholarship> scrapeScholarships() {

//         List<Scholarship> list = new ArrayList<>();

//         try {

//             // Example public scholarship listing page
//             String url = "https://www.buddy4study.com/scholarships";

// Document doc = Jsoup.connect(url)
//         .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
//         .header("Accept-Language", "en-US,en;q=0.9")
//         .timeout(15000)
//         .get();

// Elements scholarships = doc.select("div[class^=Listing_categoriesCard]");

// for (Element s : scholarships) {

// String title = s.select("h4[class^=Listing_scholarshipName]").text();

//     Scholarship scholarship = new Scholarship();
//     scholarship.setTitle(title);
//     scholarship.setCategory("General");
//     scholarship.setAmount(50000);
//     scholarship.setDeadline(LocalDate.now().plusMonths(1));

//     list.add(scholarship);
// }


//         } catch (Exception e) {
//             e.printStackTrace();
//         }

//         return list;
//     }
// }
