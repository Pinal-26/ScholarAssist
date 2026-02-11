package com.scholarassist.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

@Service
public class ScholarshipScraperService {

    public List<Map<String, String>> scrapeScholarships() {

    List<Map<String, String>> list = new ArrayList<>();

    try {

        String url = "https://books.toscrape.com/";

        Document doc = Jsoup.connect(url)
                .userAgent("Mozilla/5.0")
                .get();

        Elements books = doc.select(".product_pod");

        for (Element book : books) {

            Map<String, String> item = new HashMap<>();

            item.put("title", book.select("h3 a").attr("title"));
            item.put("price", book.select(".price_color").text());

            list.add(item);
        }

    } catch (Exception e) {
        e.printStackTrace();
    }

    return list;
}


}
