package backend.lecture0820.features.blogs.controller;

import java.util.List;

import backend.lecture0820.features.blogs.domain.dto.BlogResponseDTO;
import backend.lecture0820.features.blogs.service.BlogReactService;

public class ListController {

    private BlogReactService service ;
    public ListController() {
    }
    public ListController(BlogReactService service ) {
        this.service = service ;
    }
    
    // view 에게 응답하는 역할의 메서드 
    public List<BlogResponseDTO> list() {
        System.out.println("debug >>>> list controller list() "); 
        return service.list() ; 
    }
    

}

