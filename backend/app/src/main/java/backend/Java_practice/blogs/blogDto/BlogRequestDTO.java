package backend.Java_practice.blogs.blogDto;

import lombok.Builder;

// Data transfer object (DTO) : 데이터를 전달하기 위한 객체
// 보통 DTO 는 front-end 에서 back-end 로 데이터를 전달할 때 사용된다.
// DTO 는 데이터를 전달하기 위한 객체이므로, 보통은 getter 와 setter 를 가지고 있다.
@Builder
public class BlogRequestDTO {
    private String title;
    private String content;

    public BlogRequestDTO(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

}
// reqeust 를 전달할 때, DTO 를 통해서 데이터를 전달할 수 있다. DTO 는 데이터를 전달하기 위한 객체이다.
// DTO 는 크게 두가지가 존재한다 Request DTO 와 Response DTO 가 존재한다. Request DTO 는 front-end 에서 back-end 로 데이터를 전달할 때 사용되고, Response DTO 는 back-end 에서 front-end 로 데이터를 전달할 때 사용된다.
