package foodsearch;

class CustomMath {
    static double dist(Point a, Point b) {
        return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    }

    static double dist_to_segment(Point a, Point b, Point c) {
        // distance between the segment ab and c. probably won't need this
        Point proj = projection(a, b, c);
        if (dist(proj, a) < dist(a, b) && dist(proj, b) < dist(a, b)) {
            return dist(c, proj);
        } else if (dist(proj, a) < dist(proj, b)) {
            return dist(a, c);
        }
        else {
            return dist(b, c);
        }
    }

    static Point projection(Point a, Point b, Point c) {
        // projection of c on the line ab. probably won't need this
        double abx = b.x - a.x;
        double aby = b.y - a.y;
        double acx = c.x - a.x;
        double acy = c.y - a.y;
        double coeff = (abx * acx + aby * acy) / (abx * abx + aby * aby);
        Point d = new Point(a.x + abx * coeff, a.y + aby * coeff);
        return d;
    }

    static boolean point_on_segment(Point a, Point b, Point c) {
        // checks if the point c on the line ab is also on the segment ab.
        if (dist(a, c) < dist(a, b) && dist(b, c) < dist(a, b)) {
            return true;
        }
        else {
            return false;
        }
    }

    static Point segment_circle_intersection(Point a, Point b, Point c, double r) {
        if (b.x - a.x != 0) {
            double m = (b.y - a.y) / (b.x - a.x);
            double n = a.y - m * a.x;
            double A = m * m + 1;
            double B = 2 * (m * n - m * c.y - c.x);
            double C = c.y * c.y - r * r + c.x * c.x - 2 * n * c.y + n * n;
            double delta = B * B - 4 * A * C;
            if (delta < 0) {
                return null;
            } else if (delta == 0) {
                double intersX = -B / (2 * A);
                double intersY = m * intersX + n;
                Point inters = new Point(intersX, intersY);
                if (point_on_segment(a, b, inters)) {
                    return inters;
                }
                else {
                    return null;
                }
            }
            else {
                double intersX1 = (-B + Math.sqrt(delta)) / (2 * A);
                double intersY1 = m * intersX1 + n;
                double intersX2 = (-B - Math.sqrt(delta)) / (2 * A);
                double intersY2 = m * intersX2 + n;
                Point inters1 = new Point(intersX1, intersY1);
                Point inters2 = new Point(intersX2, intersY2);
                if (point_on_segment(a, b, inters1) && point_on_segment(a, b, inters2)) {
                    if (dist(a, inters1) < dist(a, inters2)) {
                        return inters1;
                    }
                    else {
                        return inters2;
                    }
                }
                else if (point_on_segment(a, b, inters1)) {
                    return inters1;
                }
                else if (point_on_segment(a, b, inters2)) {
                    return inters2;
                }
                else {
                    return null;
                }
            }
        }
        else {
            double B = -2 * c.y;
            double C = c.x * c.x + c.y * c.y - r * r - 2 * a.x * c.x + a.x * a.x;
            double delta = B * B - 4 * C;
            if (delta < 0) {
                return null;
            }
            else if (delta == 0) {
                double intersY = -B / 2;
                Point inters = new Point(a.x, intersY);
                if (point_on_segment(a, b, inters)) {
                    return inters;
                }
                else {
                    return null;
                }
            }
            else {
                double intersY1 = (-B + Math.sqrt(delta)) / 2;
                double intersY2 = (-B - Math.sqrt(delta)) / 2;
                Point inters1 = new Point(a.x, intersY1);
                Point inters2 = new Point(a.x, intersY2);
                if (point_on_segment(a, b, inters1) && point_on_segment(a, b, inters2)) {
                    if (dist(a, inters1) < dist(a, inters2)) {
                        return inters1;
                    }
                    else {
                        return inters2;
                    }
                }
                else if (point_on_segment(a, b, inters1)) {
                    return inters1;
                }
                else if (point_on_segment(a, b, inters2)) {
                    return inters2;
                }
                else {
                    return null;
                }
            }
        }
    }
}
