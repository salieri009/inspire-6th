package backend.lecture0819.features.blogs.controller;

import backend.lecture0819.features.blogs.domain.dto.BlogResponseDTO;
import backend.lecture0819.features.blogs.service.BlogReactService;

public class ReadController {

    private BlogReactService service ;
    public ReadController() {
    }
    public ReadController(BlogReactService service ) {
        this.service = service ;
    }

    public BlogResponseDTO read(int blogId) {
        System.out.println("debug >>>> read controller read params :  "+blogId );
        return service.read(blogId) ;
    }
}
