package backend.spring.blog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BlogRequestDTO {

    private String title;
    private String content;
    private String email;

    // search 요청에서만 사용, 저장되지 않음
    private String keyword;
}
