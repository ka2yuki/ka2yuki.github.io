<?php
/**
 *
 */
class Model
{

  private $pages = array(
    array('slug' => 'php', 'paged' => '1', 'title' => 'PHP1page', 'body' => 'php view 1' ),
    array('slug' => 'php', 'paged' => '2', 'title' => 'PHP2page', 'body' => 'php view 2'),
    array('slug' => 'php', 'paged' => '3', 'title' => 'PHP3page', 'body' => 'php view 3'),
    array('slug' => 'mvc', 'paged' => '1', 'title' => 'mvc1page', 'body' => 'mvc view 1'),
    array('slug' => 'mvc', 'paged' => '2', 'title' => 'mvc2page', 'body' => 'mvc view 2'),
    array('slug' => 'mvc', 'paged' => '3', 'title' => 'mvc3page', 'body' => 'mvc view 3')
  );

  public function getTitle($slug, $paged){
    foreach ($this->pages as $page) {
      if($slug === $page['slug'] && $paged === $page['paged']){
        return $page['title'];
      }
    }
  }
  public function getBody($slug, $paged){
    foreach ($this->pages as $page) {
      if ($slug == $page['slug'] && $paged === $page['paged']) {
        return $page['body'];
      }
    }
  }
  public function getPages(){
    return $this->pages;
  }
}

/**
 *
 */
class View
{
  public function getHtml($title, $body, $pages)
  {
    $html = '';
    $html .= '<html>';
    $html .= $this->getHeadHtml($title);
    $html .= '<body>';
    $html .= '<div>';
    $html .= $this->getNaviHtml($pages);
    $html .= $this->getContentHtml($title, $body);
    $html .= '</div>';
    $html .= '</body>';

    return $html;
  }
  private function getHeadHtml($title)
  {
    $html = '';
    $html .= '<head>';
    $html .= $this->getTitle($title);
    $html .= '</head>';
    return $html;
  }
  private function getTitle($title)
  {
    $html = '';
    $html .= '<title>'.$title.'</title>';
    return $html;
  }

  private function getNaviHtml($pages)
  {
    $html = '';
    $html .= '<ul>';
    foreach ($pages as $page) {
      $slug = $page['slug'];
      $paged = $page['paged'];
      $title = $page['title'];
      $html .= '<li><a  href="?slug='.$slug.'&paged='.$paged.'">'.$title.'</a></li>';
    }
    $html .= '</ul>';
    return $html;
   }
   private function getContentHtml($title, $body)
   {
     $html = '';
     $html .= '<h1>';
     $html .= $title;
     $html .= '<p style="color:blue;">';
     $html .= $body;
     $html .= '</p>';
     return $html;
   }
}

$model = new Model();
$title = $model->getTitle($_GET['slug'], $_GET['paged']);
$body = $model->getBody($_GET['slug'], $_GET['paged']);
$pages = $model->getPages();

$view = new View();
$html = $view->getHtml($title, $body, $pages);

print($html);





























 ?>
