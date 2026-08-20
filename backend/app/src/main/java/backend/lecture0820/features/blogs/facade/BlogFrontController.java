package backend.lecture0820.features.blogs.facade;

import java.util.List;

import javax.swing.ListCellRenderer;

import backend.lecture0820.features.blogs.controller.InsertController;
import backend.lecture0820.features.blogs.controller.ListController;
import backend.lecture0820.features.blogs.controller.ReadController;
import backend.lecture0820.features.blogs.controller.SearchController;
import backend.lecture0820.features.blogs.domain.dto.BlogResponseDTO;
import backend.lecture0820.features.blogs.factory.BlogBeanFactory;

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

    public BlogResponseDTO read(String endPoint , int blogId) {
        System.out.println("debug >>>> front controller endPoint : "+endPoint+", blogId : "+blogId);

        // Q) 팩토리를 통해서 ReadController 객체를 반환받고 해당 객체의 read() 메서드로 파라미터를 전달하여 반환
        Object controller = factory.getBean(endPoint);
        return ((ReadController)controller).read(blogId)  ;
    }

    public List<BlogResponseDTO> search(String endPoint , String keyword) {
        System.out.println("debug >>>> front controller endPoint : "+endPoint+", keyword : "+keyword);

        Object controller = factory.getBean(endPoint);
        return ((SearchController)controller).search(keyword)  ;

    }

    public int insert(String endPoint , String title, String content, String email) {
        System.out.println("debug >>>> front controller endPoint : "+endPoint);

        Object controller = factory.getBean(endPoint);
        return ((InsertController)controller).insert(title, content, email)  ;

    }



}
