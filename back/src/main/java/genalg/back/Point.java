package genalg.back;

class Point {
    double x;
    double y;
    public Point(double x, double y) {
        this.x = x;
        this.y = y;
    }
    void copy(Point p) {
        x = p.x;
        y = p.y;
    }
}
