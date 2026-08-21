package backend.lecture0819.features.blogs.facade;

import java.util.List;

import javax.swing.ListCellRenderer;

import backend.lecture0819.features.blogs.controller.ListController;
import backend.lecture0819.features.blogs.controller.ReadController;
import backend.lecture0819.features.blogs.domain.dto.BlogResponseDTO;
import backend.lecture0819.features.blogs.factory.BlogBeanFactory;

public class BlogFrontController {
    
    private BlogBeanFactory factory ; 
    public BlogFrontController(){
        factory = BlogBeanFactory.getInstance();
    }
    public List<BlogResponseDTO> list(String endPoint) {
        System.out.println("debug >>>> front controller endPoint : "+endPoint); 
        Object controller = factory.getBean(endPoint);
        return ((ListController)controller).list()  ; 
    }

    public BlogResponseDTO read(String endPoint, int blogId) {
        System.out.println("debug >>>> front controller endPoint : "+endPoint+", blogId : "+blogId);

        Object controller = factory.getBean(endPoint);
        return ((ReadController)controller).read(blogId) ;
    }


}
