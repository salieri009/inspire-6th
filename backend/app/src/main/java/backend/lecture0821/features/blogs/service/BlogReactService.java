package backend.lecture0821.features.blogs.service;

import java.util.List;

import backend.lecture0821.features.blogs.domain.dto.BlogRequestDTO;
import backend.lecture0821.features.blogs.domain.dto.BlogResponseDTO;

public interface BlogReactService {

    public List<BlogResponseDTO>    list();
    public BlogResponseDTO          read(int blogId) ;

    // CURD : insert, update, delete
    public int                      insert(BlogRequestDTO request) ;
    public int                      update(BlogRequestDTO request) ;
    public int                      delete(int blogId) ;

    public List<BlogResponseDTO>    search(BlogRequestDTO request);

    // file save, load
    public boolean                  saveToFile();
    public boolean                  loadToFile();
}

