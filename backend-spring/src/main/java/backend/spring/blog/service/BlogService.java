package backend.spring.blog.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import backend.spring.blog.dto.BlogRequestDTO;
import backend.spring.blog.entity.Blog;
import backend.spring.blog.repository.BlogRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository blogRepository;

    public List<Blog> list() {
        return blogRepository.findAll();
    }

    public Blog read(Integer blogId) {
        return blogRepository.findById(blogId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, blogId + " 정보를 찾을 수 없습니다."));
    }

    public Blog insert(BlogRequestDTO request) {
        Blog blog = Blog.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .email(request.getEmail())
                .build();
        return blogRepository.save(blog);
    }

    public Blog update(Integer blogId, BlogRequestDTO request) {
        Blog blog = read(blogId);
        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());
        return blogRepository.save(blog);
    }

    public void delete(Integer blogId) {
        Blog blog = read(blogId);
        blogRepository.delete(blog);
    }

    public List<Blog> search(String keyword) {
        return blogRepository.findByTitleContainingOrContentContaining(keyword, keyword);
    }
}
