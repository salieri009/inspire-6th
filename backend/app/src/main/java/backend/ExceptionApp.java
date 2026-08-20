package backend;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ExceptionApp {

	public static void main(String[] args) {
		// 여러 예외를 하나의 catch에서 처리
		try {
			int[] numbers = {1, 2, 3};
			System.out.println(numbers[5]);
		} catch (ArrayIndexOutOfBoundsException | NullPointerException e) {
			System.out.println("다중 예외 처리: " + e.getClass().getSimpleName());
		}

		// 예외 설계: 잘못된 입력은 의미 있는 예외로 변환
		try {
			divide(10, 0);
		} catch (IllegalArgumentException e) {
			System.out.println("입력 예외: " + e.getMessage());
		} finally {
			System.out.println("finally는 항상 실행됩니다.");
		}

		// 사용자 정의 checked exception
		try {
			withdraw(5_000, 10_000);
		} catch (InsufficientBalanceException e) {
			System.out.println("사용자 정의 예외: " + e.getMessage());
		}

		// 표준 입력 스트림 읽기
		BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
		String line = null;
		try {
			line = reader.readLine();
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println(line);
		// BufferedReader는 문자 기반 입력 스트림을 버퍼링하여 효율적인 읽기 기능을 제공하는 클래스입니다.
		// InputStreamReader는 바이트 기반 입력 스트림을 문자 기반 입력 스트림으로 변환하는 클래스입니다.
		// System.in은 표준 입력 스트림으로, 일반적으로 키보드 입력을 나타냅니다.

		// 객체 행성으로 buffer 를 형성
		// buffer 는 데이터를 임시로 저장하는 공간으로, 입력과 출력의 효율성을 높이는 역할을 합니다.
		// 사실상 중간 휴게소
	}

	private static void divide(int dividend, int divisor) {
		if (divisor == 0) {
			throw new IllegalArgumentException("0으로 나눌 수 없습니다.");
		}
		System.out.println(dividend / divisor);
	}

	private static void withdraw(int balance, int amount)
			throws InsufficientBalanceException {
		if (amount > balance) {
			throw new InsufficientBalanceException("잔액이 부족합니다.");
		}
		System.out.println("출금 완료");
	}

	// 사용자 정의 checked exception
	private static class InsufficientBalanceException extends Exception {
		private InsufficientBalanceException(String message) {
			super(message);
		}
	}
}


// dao

// next line -> 공백을 포함하는 것을 입력받을수잇음
// wrapper class 를 열어보는 건 parsing 이라고함
// System.in 은 표준 입력 스트림으로, 일반적으로 키보드 입력을 나타냅니다.
// System.exit(1) 은 프로그램을 종료하는 메서드로, 1은 비정상 종료를 나타내는 상태 코드입니다.
