package backend.lecture0821.features.blogs.factory;

import java.util.HashMap;
import java.util.Map;

import backend.lecture0821.features.blogs.controller.DeleteController;
import backend.lecture0821.features.blogs.controller.FileController;
import backend.lecture0821.features.blogs.controller.InsertController;
import backend.lecture0821.features.blogs.controller.ListController;
import backend.lecture0821.features.blogs.controller.ReadController;
import backend.lecture0821.features.blogs.controller.SearchController;
import backend.lecture0821.features.blogs.controller.UpdateController;
import backend.lecture0821.features.blogs.repository.BlogReactDao;
import backend.lecture0821.features.blogs.service.BlogReactService;
import backend.lecture0821.features.blogs.service.BlogReactServiceImpl;

/*
singleton   pattern
factory     pattern
사용자의 요청 endPoint 로 각 controller 객체를 바인딩해서 담을 것 : Map
*/
public class BlogBeanFactory {

    private Map<String, Object>     map ;
    private static BlogBeanFactory  instance ;

    // dependency injection
    private BlogReactService        service ;
    private BlogReactDao            dao ;


    private BlogBeanFactory() {
        map = new HashMap<>();

        dao = new BlogReactDao();
        service = new BlogReactServiceImpl(dao);

        // 추후 추가되는 각 기능을 구현하는 xxxController 등록
        map.put("list.inspire",     new ListController(service));

        // Q) ReadController 등록
        map.put("read.inspire",     new ReadController(service));
        map.put("search.inspire",   new SearchController(service));
        map.put("insert.inspire",   new InsertController(service));
        map.put("delete.inspire",   new DeleteController(service));
        map.put("update.inspire",   new UpdateController(service));
        map.put("file.inspire",     new FileController(service));
    }

    public static BlogBeanFactory getInstance() {
        if(instance == null) {
            instance = new BlogBeanFactory() ;
        }
        return instance;
    }

    // front controller 가 호출하는 메서드
    public Object getBean(String endPoint) {
        return map.get(endPoint) ;
    }


}

