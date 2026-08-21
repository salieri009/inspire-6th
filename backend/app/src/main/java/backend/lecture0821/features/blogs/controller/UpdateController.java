package backend.lecture0821.features.blogs.controller;

import backend.lecture0821.features.blogs.domain.dto.BlogRequestDTO;
import backend.lecture0821.features.blogs.service.BlogReactService;

public class UpdateController {

    private BlogReactService service ;
    public UpdateController() {
    }
    public UpdateController(BlogReactService service ) {
        this.service = service ;
    }

    public int update(int blogId, String title, String content) {
        System.out.println("debug >>>> insert controller insert params : "+title+"\t"+content+"\t"+blogId);

        return service.update(BlogRequestDTO.builder()
                                            .title(title)
                                            .content(content)
                                            .blogId(blogId).build()) ;


    }
}
