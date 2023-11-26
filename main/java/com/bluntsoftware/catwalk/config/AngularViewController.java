package com.bluntsoftware.catwalk.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin
@Controller
public class AngularViewController {
  /*
      Configure the server to redirect requests for missing files to index.html.
  */
  @RequestMapping({"/app/**"})
  public String  redirect() {
    return "forward:/index.html";
  }

}
