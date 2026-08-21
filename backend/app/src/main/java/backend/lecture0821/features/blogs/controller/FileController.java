package backend.lecture0821.features.blogs.controller;

import backend.lecture0821.features.blogs.service.BlogReactService;

public class FileController {

    private BlogReactService service ;
    public FileController() {
    }
    public FileController(BlogReactService service ) {
        this.service = service ;
    }

    public boolean save() {
        System.out.println("debug >>>> file controller save : ");
        return service.saveToFile();
    }
    public boolean load() {
        System.out.println("debug >>>> file controller load : ");
        return service.loadToFile();
    }


}
