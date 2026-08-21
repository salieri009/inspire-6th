package backend.lecture0821.features.blogs.controller;

import backend.lecture0821.features.blogs.domain.dto.BlogResponseDTO;
import backend.lecture0821.features.blogs.service.BlogReactService;

public class ReadController {

    /*
    Q)
    - BlogService 와 의존성 관계를 형성
    */
    private BlogReactService service ;
    public ReadController() {
    }
    public ReadController(BlogReactService service ) {
        this.service = service ;
    }

    public BlogResponseDTO read(int blogId) {
        System.out.println("debug >>>> read controller read params :  "+blogId );
        // Q) service read() 호출해서 반환
        return service.read(blogId) ;
    }
}
