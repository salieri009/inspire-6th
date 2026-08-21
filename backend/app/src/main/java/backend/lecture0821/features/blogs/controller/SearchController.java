package backend.lecture0821.features.blogs.controller;

import java.util.List;

import backend.lecture0821.features.blogs.domain.dto.BlogRequestDTO;
import backend.lecture0821.features.blogs.domain.dto.BlogResponseDTO;
import backend.lecture0821.features.blogs.service.BlogReactService;

public class SearchController {
    private BlogReactService service ;
    public SearchController() {
    }
    public SearchController(BlogReactService service ) {
        this.service = service ;
    }

    // view 에게 응답하는 역할의 메서드
    public List<BlogResponseDTO> search(String keyword) {
        System.out.println("debug >>>> search controller search params :  "+keyword);
        return service.search(BlogRequestDTO.builder()
                                    .keyword(keyword)
                                    .build()) ;
    }

}
