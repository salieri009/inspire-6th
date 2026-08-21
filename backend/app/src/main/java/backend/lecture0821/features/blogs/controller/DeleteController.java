package backend.lecture0821.features.blogs.controller;

import backend.lecture0821.features.blogs.service.BlogReactService;

public class DeleteController {
    private BlogReactService service ;
    public DeleteController() {
    }
    public DeleteController(BlogReactService service ) {
        this.service = service ;
    }

    public int delete(int blogId) {
        System.out.println("debug >>>> delete controller delete params :  "+blogId);
        return service.delete(blogId) ;
    }
}
