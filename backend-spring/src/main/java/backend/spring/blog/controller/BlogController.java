package backend.spring.blog.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import backend.spring.blog.dto.BlogRequestDTO;
import backend.spring.blog.entity.Blog;
import backend.spring.blog.service.BlogService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;

    @GetMapping
    public ResponseEntity<List<Blog>> list() {
        return ResponseEntity.ok(blogService.list());
    }

    @GetMapping("/{blogId}")
    public ResponseEntity<Blog> read(@PathVariable Integer blogId) {
        return ResponseEntity.ok(blogService.read(blogId));
    }

    @PostMapping
    public ResponseEntity<Blog> insert(@RequestBody BlogRequestDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(blogService.insert(request));
    }

    @PutMapping("/{blogId}")
    public ResponseEntity<Blog> update(@PathVariable Integer blogId, @RequestBody BlogRequestDTO request) {
        return ResponseEntity.ok(blogService.update(blogId, request));
    }

    @DeleteMapping("/{blogId}")
    public ResponseEntity<Void> delete(@PathVariable Integer blogId) {
        blogService.delete(blogId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Blog>> search(@RequestParam String keyword) {
        return ResponseEntity.ok(blogService.search(keyword));
    }
}
