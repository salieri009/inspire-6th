package backend.Java_practice.stats;

import java.util.Scanner;

// Scanner + 반복문 + break/continue + Math.random() + printf 실습
public class GuessGame {

    private static final int MIN = 1;
    private static final int MAX = 100;

    public void play() {
        int answer = (int) (Math.random() * MAX) + MIN;
        int tryCount = 0;

        Scanner scanner = new Scanner(System.in);
        System.out.printf("%d ~ %d 사이의 숫자를 맞춰보세요!%n", MIN, MAX);

        while (true) {
            System.out.print("숫자 입력: ");

            if (!scanner.hasNextInt()) {
                System.out.println("숫자만 입력해주세요.");
                scanner.next();
                continue;
            }

            int guess = scanner.nextInt();

            if (guess < MIN || guess > MAX) {
                System.out.printf("%d ~ %d 사이의 값을 입력해주세요.%n", MIN, MAX);
                continue;
            }

            tryCount++;

            if (guess == answer) {
                System.out.printf("정답입니다! %d번 만에 맞혔습니다. (정답: %d)%n", tryCount, answer);
                break;
            } else if (guess < answer) {
                System.out.printf("%d번째 시도: %d -> 더 큰 수입니다.%n", tryCount, guess);
            } else {
                System.out.printf("%d번째 시도: %d -> 더 작은 수입니다.%n", tryCount, guess);
            }
        }

        scanner.close();
    }
}
