package com.scholarassist.scheduler;

import com.scholarassist.entity.Notification;
import com.scholarassist.entity.Scholarship;
import com.scholarassist.entity.User;
import com.scholarassist.repository.NotificationRepository;
import com.scholarassist.repository.ScholarshipRepository;
import com.scholarassist.repository.UserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DeadlineNotificationScheduler {

    private final ScholarshipRepository scholarshipRepository;
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public DeadlineNotificationScheduler(
            ScholarshipRepository scholarshipRepository,
            NotificationRepository notificationRepository,
            UserRepository userRepository) {

        this.scholarshipRepository = scholarshipRepository;
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    @Scheduled(cron = "0 0 9 * * ?") // every day at 9 AM
    public void checkDeadlines() {

        LocalDate today = LocalDate.now();
        LocalDate threeDaysLater = today.plusDays(3);

        List<Scholarship> scholarships = scholarshipRepository.findAll();
        List<User> users = userRepository.findAll();

        for (Scholarship s : scholarships) {

            if (s.getDeadline().equals(threeDaysLater.toString())) {

                for (User user : users) {
                    notificationRepository.save(
                        new Notification(
                            user.getId(),
                            "⏳ Deadline approaching for: " + s.getTitle()
                        )
                    );
                }
            }
        }
    }
}