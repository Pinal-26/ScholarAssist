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

            // 1️⃣ National Merit Scholarship
            Scholarship s1 = new Scholarship();
            s1.setTitle("National Merit Scholarship");
            s1.setProvider("Government of India");
            s1.setCategory("Government");
            s1.setApplyLink("https://scholarships.gov.in");
            s1.setAmount(50000);
            s1.setDeadline(LocalDate.parse("2026-03-31"));
            s1.setEligibility("Income below 8L, Indian citizen");
            s1.setMaxIncome(800000.0);
            list.add(s1);

            // 2️⃣ Mukhyamantri Yuva Swavalamban Yojana
            Scholarship s2 = new Scholarship();
            s2.setTitle("Mukhyamantri Yuva Swavalamban Yojana (MYSY)");
            s2.setProvider("Government of Gujarat");
            s2.setCategory("Government");
            s2.setApplyLink("https://mysy.guj.nic.in");
            s2.setAmount(200000);
            s2.setDeadline(LocalDate.parse("2026-03-31"));
            s2.setEligibility("Family income < 6L, Gujarat domicile");
            s2.setMaxIncome(600000.0);
            list.add(s2);

            // 3️⃣ Post Matric SC
            Scholarship s3 = new Scholarship();
            s3.setTitle("Post Matric Scholarship for SC Students");
            s3.setProvider("Social Justice Department, Gujarat");
            s3.setCategory("SC");
            s3.setApplyLink("https://digitalgujarat.gov.in");
            s3.setAmount(48000);
            s3.setDeadline(LocalDate.parse("2026-02-28"));
            s3.setEligibility("SC category, income < 2.5L");
            s3.setMaxIncome(250000.0);
            list.add(s3);

            // 4️⃣ Post Matric ST
            Scholarship s4 = new Scholarship();
            s4.setTitle("Post Matric Scholarship for ST Students");
            s4.setProvider("Tribal Development Department, Gujarat");
            s4.setCategory("ST");
            s4.setApplyLink("https://digitalgujarat.gov.in");
            s4.setAmount(60000);
            s4.setDeadline(LocalDate.parse("2026-02-28"));
            s4.setEligibility("ST category, income < 2.5L");
            s4.setMaxIncome(250000.0);
            list.add(s4);

            // 5️⃣ Post Matric OBC
            Scholarship s5 = new Scholarship();
            s5.setTitle("Post Matric Scholarship for OBC Students");
            s5.setProvider("Social Justice Department, Gujarat");
            s5.setCategory("OBC");
            s5.setApplyLink("https://digitalgujarat.gov.in");
            s5.setAmount(40000);
            s5.setDeadline(LocalDate.parse("2026-02-28"));
            s5.setEligibility("OBC category, income < 2.5L");
            s5.setMaxIncome(250000.0);
            list.add(s5);

            // 6️⃣ Minority Post Matric
            Scholarship s6 = new Scholarship();
            s6.setTitle("Minority Post Matric Scholarship");
            s6.setProvider("Minority Welfare Department");
            s6.setCategory("Minority");
            s6.setApplyLink("https://scholarships.gov.in");
            s6.setAmount(35000);
            s6.setDeadline(LocalDate.parse("2026-02-20"));
            s6.setEligibility("Minority category, income < 2L");
            s6.setMaxIncome(200000.0);
            list.add(s6);

            // 7️⃣ Pragati Scholarship for Girls
            Scholarship s7 = new Scholarship();
            s7.setTitle("Pragati Scholarship for Girls");
            s7.setProvider("AICTE");
            s7.setCategory("Central Government");
            s7.setApplyLink("https://www.aicte-india.org");
            s7.setAmount(50000);
            s7.setDeadline(LocalDate.parse("2026-01-31"));
            s7.setEligibility("Girl student, income < 8L");
            s7.setMaxIncome(800000.0);
            list.add(s7);

            // 8️⃣ Chief Minister Scholarship Scheme
            Scholarship s8 = new Scholarship();
            s8.setTitle("Chief Minister Scholarship Scheme");
            s8.setProvider("Government of Gujarat");
            s8.setCategory("Government");
            s8.setApplyLink("https://digitalgujarat.gov.in");
            s8.setAmount(25000);
            s8.setDeadline(LocalDate.parse("2026-03-15"));
            s8.setEligibility("Merit-based");
            s8.setMinGpa(7.0);
            list.add(s8);

            // 9️⃣ INSPIRE Scholarship
            Scholarship s9 = new Scholarship();
            s9.setTitle("INSPIRE Scholarship");
            s9.setProvider("Department of Science & Technology, India");
            s9.setCategory("Central Government");
            s9.setApplyLink("https://online-inspire.gov.in");
            s9.setAmount(80000);
            s9.setDeadline(LocalDate.parse("2026-01-10"));
            s9.setEligibility("Top 1% in board exams");
            s9.setMinGpa(8.5);
            list.add(s9);

            // 🔟 Ishaan Uday Scholarship
            Scholarship s10 = new Scholarship();
            s10.setTitle("Ishaan Uday Special Scholarship");
            s10.setProvider("UGC");
            s10.setCategory("Central Government");
            s10.setApplyLink("https://scholarships.gov.in");
            s10.setAmount(80000);
            s10.setDeadline(LocalDate.parse("2026-01-31"));
            s10.setEligibility("NER student, income < 4.5L");
            s10.setMaxIncome(450000.0);
            list.add(s10);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return list;
    }
}
