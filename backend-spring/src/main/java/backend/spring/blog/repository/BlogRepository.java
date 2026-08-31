package backend.spring.blog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import backend.spring.blog.entity.Blog;

public interface BlogRepository extends JpaRepository<Blog, Integer> {

    List<Blog> findByTitleContainingOrContentContaining(String title, String content);
}
